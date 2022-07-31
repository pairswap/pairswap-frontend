import * as CSL from '@emurgo/cardano-serialization-lib-asmjs';

import { getProvider } from 'utils/provider';
import CoinSelection from 'utils/cardano';

const protocolParameter = {
  linearFee: {
    minFeeA: '44',
    minFeeB: '155381',
  },
  minUtxo: 1000000,
  poolDeposit: 500000000,
  keyDeposit: 2000000,
  maxTxSize: 16384,
  maxValueSize: 5000,
  coinsPerUtxoWord: '34482',
};

class CardanoLibrary {
  provider;

  constructor(name) {
    this.name = name;
  }

  async init() {
    const isEnabled = await window.cardano[this.name].isEnabled();

    if (isEnabled) {
      this.provider = await getProvider(this.name);
    }
  }

  async connect() {
    try {
      this.provider = await getProvider(this.name);
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

  async transfer({ gatewayAddress, account, recipient, destChain, tokenOut, amount }) {
    const splits = tokenOut.split(':');
    if (splits.length < 2) return;

    const [assetPolicy, assetName] = splits;
    const paymentAddress = CSL.Address.from_bech32(account);

    const rawUtxos = await this.provider.getUtxos();
    const utxos = rawUtxos.map((e) =>
      CSL.TransactionUnspentOutput.from_bytes(Buffer.from(e, 'hex'))
    );
    const receiveAddress = CSL.Address.from_bech32(gatewayAddress);

    let multiAsset = CSL.MultiAsset.new();
    let assets = CSL.Assets.new();

    assets.insert(
      CSL.AssetName.new(Buffer.from(assetName, 'utf8')),
      CSL.BigNum.from_str(amount.toString())
    );

    multiAsset.insert(CSL.ScriptHash.from_bytes(Buffer.from(assetPolicy, 'hex')), assets);

    const outputValue = CSL.Value.new(CSL.BigNum.from_str('0'));
    outputValue.set_multiasset(multiAsset);
    outputValue.set_coin(CSL.BigNum.from_str('1600000'));

    const outputs = CSL.TransactionOutputs.new();
    outputs.add(CSL.TransactionOutput.new(receiveAddress, outputValue));

    const totalAssets = 0;
    CoinSelection.setLoader(CSL);
    CoinSelection.setProtocolParameters(
      protocolParameter.minUtxo.toString(),
      protocolParameter.linearFee.minFeeA.toString(),
      protocolParameter.linearFee.minFeeB.toString(),
      protocolParameter.maxTxSize.toString()
    );

    const selection = CoinSelection.randomImprove(utxos, outputs, 20 + totalAssets);
    const inputs = selection.input;
    const txBuilderConfig = CSL.TransactionBuilderConfigBuilder.new()
      .fee_algo(
        CSL.LinearFee.new(
          CSL.BigNum.from_str(protocolParameter.linearFee.minFeeA),
          CSL.BigNum.from_str(protocolParameter.linearFee.minFeeB)
        )
      )
      .pool_deposit(CSL.BigNum.from_str(protocolParameter.poolDeposit.toString()))
      .key_deposit(CSL.BigNum.from_str(protocolParameter.keyDeposit.toString()))
      .coins_per_utxo_word(CSL.BigNum.from_str(protocolParameter.coinsPerUtxoWord))
      .max_value_size(protocolParameter.maxValueSize)
      .max_tx_size(protocolParameter.maxTxSize.toString())
      .prefer_pure_change(true)
      .build();
    const txBuilder = CSL.TransactionBuilder.new(txBuilderConfig);

    for (let i = 0; i < inputs.length; i++) {
      const utxo = inputs[i];
      txBuilder.add_input(utxo.output().address(), utxo.input(), utxo.output().amount());
    }

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

    for (let i = 0; i < outputs.len(); i++) {
      txBuilder.add_output(outputs.get(i));
    }

    txBuilder.add_change_if_needed(paymentAddress);

    const transaction = CSL.Transaction.new(
      txBuilder.build(),
      CSL.TransactionWitnessSet.new(),
      auxiliaryData
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
