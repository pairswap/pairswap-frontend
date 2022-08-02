import { getProvider } from 'utils/provider';
import { CoinSelection, CSL, multiAssetCount } from 'utils/cardano';

const protocolParameters = {
  linearFee: {
    minFeeA: '44',
    minFeeB: '155381',
  },
  minUtxo: '1600000',
  poolDeposit: '500000000',
  keyDeposit: '2000000',
  coinsPerUtxoWord: '34482',
  maxValueSize: 5000,
  maxTxSize: '16384',
};

class CardanoLibrary {
  provider;
  isEnabled;

  constructor(name) {
    this.name = name;
  }

  async init() {
    this.isEnabled = await this.enable();

    if (this.isEnabled) {
      this.provider = await getProvider(this.name);
    }
  }

  enable() {
    try {
      return window.cardano[this.name].isEnabled();
    } catch (error) {
      return false;
    }
  }

  async connect() {
    try {
      this.provider = await getProvider(this.name);
      this.isEnabled = true;
    } catch (error) {
      throw error;
    }
  }

  async getBalance() {
    try {
      const hexBalance = await this.provider.getBalance();
      const balance = CSL.Value.from_bytes(Buffer.from(hexBalance, 'hex'));

      return (Number(balance.coin().to_str()) / 1000000).toString();
    } catch (error) {
      throw error;
    }
  }

  async getTokenBalance({ tokenAddress }) {
    const splits = tokenAddress.split(':');
    if (splits.length < 2) return;

    const [policyIdHex, assetNameString] = splits;

    const hexBalance = await this.provider.getBalance();
    const balance = CSL.Value.from_bytes(Buffer.from(hexBalance, 'hex'));

    const multiasset = balance.multiasset();
    const keys = multiasset.keys();

    const tokenBalances = [];

    for (let i = 0; i < keys.len(); i++) {
      const policyId = keys.get(i);
      const policyIdHex = Buffer.from(policyId.to_bytes(), 'utf8').toString('hex');
      const assets = multiasset.get(policyId);
      const assetNames = assets.keys();

      for (let j = 0; j < assetNames.len(); j++) {
        const assetName = assetNames.get(j);
        const assetNameString = Buffer.from(assetName.name(), 'utf8').toString();
        const assetAmount = multiasset.get_asset(policyId, assetName);

        tokenBalances.push({
          policyIdHex,
          assetNameString,
          assetAmountString: assetAmount.to_str(),
        });
      }
    }

    const foundedToken = tokenBalances.find(
      (tokenBalance) =>
        tokenBalance.policyIdHex === policyIdHex && tokenBalance.assetNameString === assetNameString
    );

    return foundedToken ? foundedToken.assetAmountString : '0';
  }

  async getAccount() {
    try {
      const account = await this.provider.getChangeAddress();
      return CSL.Address.from_bytes(Buffer.from(account, 'hex')).to_bech32();
    } catch (error) {
      throw error;
    }
  }

  async getChainId() {
    try {
      const chainId = await this.provider.getNetworkId();
      return chainId;
    } catch (error) {
      throw error;
    }
  }

  async transfer({ gatewayAddress, account, recipient, destChain, srcToken, amount }) {
    const splits = srcToken.split(':');
    if (splits.length < 2) throw new Error('Invalid token address');

    const [assetPolicy, assetName] = splits;
    const paymentAddress = CSL.Address.from_bech32(account);
    const receiveAddress = CSL.Address.from_bech32(gatewayAddress);

    const rawUtxos = await this.provider.getUtxos();
    const utxos = rawUtxos.map((e) =>
      CSL.TransactionUnspentOutput.from_bytes(Buffer.from(e, 'hex'))
    );

    let multiAsset = CSL.MultiAsset.new();
    let assets = CSL.Assets.new();

    assets.insert(
      CSL.AssetName.new(Buffer.from(assetName, 'utf8')),
      CSL.BigNum.from_str(amount.toString())
    );

    multiAsset.insert(CSL.ScriptHash.from_bytes(Buffer.from(assetPolicy, 'hex')), assets);

    const outputValue = CSL.Value.new(CSL.BigNum.from_str('0'));
    outputValue.set_multiasset(multiAsset);
    outputValue.set_coin(CSL.BigNum.from_str(protocolParameters.minUtxo));

    const outputs = CSL.TransactionOutputs.new();
    outputs.add(CSL.TransactionOutput.new(receiveAddress, outputValue));

    const totalAssets = await multiAssetCount(outputs.get(0).amount().multiasset());

    CoinSelection.setProtocolParameters(
      protocolParameters.coinsPerUtxoWord,
      protocolParameters.linearFee.minFeeA,
      protocolParameters.linearFee.minFeeB,
      protocolParameters.maxTxSize
    );
    const selection = CoinSelection.randomImprove(utxos, outputs, 20 + totalAssets);
    const inputs = selection.input;

    const txBuilderConfig = CSL.TransactionBuilderConfigBuilder.new()
      .coins_per_utxo_word(CSL.BigNum.from_str(protocolParameters.coinsPerUtxoWord))
      .fee_algo(
        CSL.LinearFee.new(
          CSL.BigNum.from_str(protocolParameters.linearFee.minFeeA),
          CSL.BigNum.from_str(protocolParameters.linearFee.minFeeB)
        )
      )
      .key_deposit(CSL.BigNum.from_str(protocolParameters.keyDeposit))
      .pool_deposit(CSL.BigNum.from_str(protocolParameters.poolDeposit))
      .max_tx_size(protocolParameters.maxTxSize)
      .max_value_size(protocolParameters.maxValueSize)
      .prefer_pure_change(true)
      .build();

    const txBuilder = CSL.TransactionBuilder.new(txBuilderConfig);

    for (let i = 0; i < inputs.length; i++) {
      const utxo = inputs[i];
      txBuilder.add_input(utxo.output().address(), utxo.input(), utxo.output().amount());
    }

    txBuilder.add_output(outputs.get(0));

    const metadata = CSL.GeneralTransactionMetadata.new();
    metadata.insert(
      CSL.BigNum.from_str('0'),
      CSL.encode_json_str_to_metadatum(
        JSON.stringify({
          chain: destChain,
          recipient,
        }),
        0
      )
    );
    const auxiliaryData = CSL.AuxiliaryData.new();
    auxiliaryData.set_metadata(metadata);
    txBuilder.set_auxiliary_data(auxiliaryData);

    txBuilder.add_change_if_needed(paymentAddress);

    const transaction = CSL.Transaction.new(
      txBuilder.build(),
      CSL.TransactionWitnessSet.new(),
      txBuilder.get_auxiliary_data()
    );

    const witneses = await this.provider.signTx(
      Buffer.from(transaction.to_bytes()).toString('hex')
    );

    const signedTx = CSL.Transaction.new(
      transaction.body(),
      CSL.TransactionWitnessSet.from_bytes(Buffer.from(witneses, 'hex')),
      transaction.auxiliary_data()
    );

    const txhash = await this.provider.submitTx(Buffer.from(signedTx.to_bytes()).toString('hex'));

    return txhash;
  }
}

export default CardanoLibrary;
