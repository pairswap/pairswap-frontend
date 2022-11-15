import BN from 'bn.js';
import { serialize } from 'borsh';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  createApproveCheckedInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';

import { getProvider } from 'utils/provider';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

class TransferOutData {
  amount = new BN(0);
  tokenAddress = '';
  chainId = 0;
  recipient = '';

  constructor(init) {
    Object.assign(this, init);
  }
}

const TransferOutDataSchema = new Map([
  [
    TransferOutData,
    {
      kind: 'struct',
      fields: [
        ['amount', 'u64'],
        ['tokenAddress', 'string'],
        ['chainId', 'u64'],
        ['recipient', 'string'],
      ],
    },
  ],
]);

class SolanaLibrary {
  provider;
  isEnabled;

  constructor(name) {
    this.name = name;
  }

  async init() {
    this.provider = getProvider(this.name);
    this.isEnabled = await this.enable();
  }

  async enable() {
    return this.provider.isConnected;
  }

  async connect() {
    try {
      await this.provider.connect();
      this.isEnabled = true;
    } catch (error) {
      throw error;
    }
  }

  async getBalance() {
    try {
      const balance = await connection.getBalance(this.provider.publicKey);
      return String(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      throw error;
    }
  }

  async accountExisted(ata) {
    let account = await connection.getAccountInfo(ata, 'confirmed');

    if (account) {
      return true;
    }

    return false;
  }

  async getTokenBalance({ tokenAddress }) {
    try {
      const mintPubkey = new PublicKey(tokenAddress);
      const ownerAta = await getAssociatedTokenAddress(mintPubkey, this.provider.publicKey);

      if (await this.accountExisted(ownerAta)) {
        const tokenBalance = await connection.getTokenAccountBalance(ownerAta);
        return tokenBalance.value.uiAmountString;
      } else {
        return String(0);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAccount() {
    return this.provider.publicKey.toString();
  }

  async getChainId() {
    return 0;
  }

  async transfer({ chainInfo, amount, srcToken }) {
    const { bridgeProgramId, bridgePda } = chainInfo;

    try {
      const mintPubkey = new PublicKey(srcToken);
      const bridgePdaPubkey = new PublicKey(bridgePda);
      const ownerAta = await getAssociatedTokenAddress(mintPubkey, this.provider.publicKey, true);
      const bridgeAta = await getAssociatedTokenAddress(mintPubkey, bridgePdaPubkey, true);

      const data = new TransferOutData({
        amount: new BN(10),
        tokenAddress: srcToken,
        chainId: 189985, // ganache1
        recipient: '0x8095f5b69F2970f38DC6eBD2682ed71E4939f988',
      });

      const payload = serialize(TransferOutDataSchema, data);

      let instructions = [];

      instructions.push(
        createApproveCheckedInstruction(
          ownerAta,
          mintPubkey,
          bridgePdaPubkey,
          this.provider.publicKey,
          1e8,
          8
        )
      );

      instructions.push(
        new TransactionInstruction({
          keys: [
            {
              pubkey: this.provider.publicKey,
              isSigner: true,
              isWritable: false,
            },
            {
              pubkey: TOKEN_PROGRAM_ID,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: ownerAta,
              isSigner: false,
              isWritable: true,
            },
            {
              pubkey: bridgeAta,
              isSigner: false,
              isWritable: true,
            },
            {
              pubkey: bridgePdaPubkey,
              isSigner: false,
              isWritable: true,
            },
          ],
          data: Buffer.from(new Uint8Array([1, ...payload])),
          programId: bridgeProgramId,
        })
      );

      const transaction = new Transaction().add(...instructions);

      transaction.feePayer = this.provider.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const { signature } = await this.provider.signAndSendTransaction(transaction);
      return signature;
    } catch (error) {
      throw error;
    }
  }
}

export default SolanaLibrary;
