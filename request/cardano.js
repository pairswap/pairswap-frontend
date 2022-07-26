import {
  AuxiliaryData,
  Address,
  AssetName,
  Assets,
  BigNum,
  GeneralTransactionMetadata,
  LinearFee,
  MultiAsset,
  Transaction,
  TransactionMetadatum,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutputBuilder,
  TransactionUnspentOutput,
  TransactionWitnessSet,
  TransactionUnspentOutputs,
  Value,
} from '@emurgo/cardano-serialization-lib-asmjs';

// https://github.com/input-output-hk/cardano-node/blob/master/configuration/cardano/testnet-shelley-genesis.json
const protocolParams = {
  minFeeA: '44',
  minFeeB: '155381',
  poolDeposit: '500000000',
  keyDeposit: '2000000',
  coinsPerUtxoWord: '34482',
  maxValSize: 5000,
  maxTxSize: '16384',
};

class CardanoLibrary {
  provider;

  constructor(name) {
    this.name = name;
  }

  async init() {
    const isEnabled = await window.cardano[this.name].isEnabled();

    if (isEnabled) {
      this.provider = await window.cardano[this.name].enable();
    }
  }

  async connect() {
    try {
      this.provider = await window.cardano[this.name].enable();
    } catch (error) {
      throw error;
    }
  }

  async getBalance() {
    try {
      const hexBalance = await this.provider.getBalance();
      const balance = Value.from_bytes(Buffer.from(hexBalance, 'hex'));

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
    const balance = Value.from_bytes(Buffer.from(hexBalance, 'hex'));

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
      return Address.from_bytes(Buffer.from(account, 'hex')).to_bech32();
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

  async transfer({ gatewayAddress, account, recipient, destChain, tokenOut, tokenIn, amount }) {
    const splits = tokenOut.split(':');
    if (splits.length < 2) return;

    const [assetPolicy, assetName] = splits;

    const txBuilderConfig = TransactionBuilderConfigBuilder.new()
      .fee_algo(
        LinearFee.new(
          BigNum.from_str(protocolParams.minFeeA),
          BigNum.from_str(protocolParams.minFeeB)
        )
      )
      .pool_deposit(BigNum.from_str(protocolParams.poolDeposit))
      .key_deposit(BigNum.from_str(protocolParams.keyDeposit))
      .coins_per_utxo_word(BigNum.from_str(protocolParams.coinsPerUtxoWord))
      .max_value_size(protocolParams.maxValSize)
      .max_tx_size(protocolParams.maxTxSize)
      .prefer_pure_change(true)
      .build();

    const txBuilder = TransactionBuilder.new(txBuilderConfig);

    const outputAddress = Address.from_bech32(gatewayAddress);
    const changeAddress = Address.from_bech32(account);

    let txOutputBuilder = TransactionOutputBuilder.new();
    txOutputBuilder = txOutputBuilder.with_address(outputAddress);
    txOutputBuilder = txOutputBuilder.next();

    let multiAsset = MultiAsset.new();
    let assets = Assets.new();

    assets.insert(AssetName.new(Buffer.from(assetName, 'utf8')), BigNum.from_str(amount));
    multiAsset.insert(ScriptHash.from_bytes(Buffer.from(assetPolicy, 'hex')), assets);

    txOutputBuilder = txOutputBuilder.with_asset_and_min_required_coin(
      multiAsset,
      BigNum.from_str('34482')
    );
    const txOutput = txOutputBuilder.build();
    txBuilder.add_output(txOutput);

    const txUnspentOutputs = TransactionUnspentOutputs.new();
    const rawUtxos = await this.provider.getUtxos();

    for (const rawUtxo of rawUtxos) {
      const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(rawUtxo, 'hex'));
      txUnspentOutputs.add(utxo);
    }

    txBuilder.add_inputs_from(txUnspentOutputs, 3);

    txBuilder.add_change_if_needed(changeAddress);

    const txBody = txBuilder.build();

    const transactionWitnessSet = TransactionWitnessSet.new();
    const witness = TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes());

    const auxiliary = AuxiliaryData.new();
    const metadata = GeneralTransactionMetadata.new();
    metadata.insert(BigNum.from_str('chain'), TransactionMetadatum.new_text(destChain));
    metadata.insert(BigNum.from_str('recipient'), TransactionMetadatum.new_text(recipient));
    auxiliary.set_metadata(metadata);

    const tx = Transaction.new(txBody, witness, auxiliary);

    let txVkeyWitnesses = await this.provider.signTx(
      Buffer.from(tx.to_bytes(), 'utf8').toString('hex'),
      true
    );
    txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, 'hex'));

    transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

    const signedTx = Transaction.new(tx.body(), transactionWitnessSet);

    const submittedTxHash = await this.provider.submitTx(
      Buffer.from(signedTx.to_bytes(), 'utf8').toString('hex')
    );

    return submittedTxHash;
  }
}

export default CardanoLibrary;
