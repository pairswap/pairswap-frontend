import BN from 'bn.js';
import { serialize } from 'borsh';
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  createApproveCheckedInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  getAccount,
} from '@solana/spl-token';

import { getProvider } from 'utils/provider';

const connection = new Connection('http://127.0.0.1:8899');
const bridgeProgramId = new PublicKey('2dc6zmDnqEScoBi8SZTHgG6fKgC8fcLYwk8DTu6Gxc8T');

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
        ['amount', 'u128'],
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

  async hasTokenAccount(tokenAccount) {
    try {
      await getAccount(connection, tokenAccount);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getTokenBalance({ tokenAddress }) {
    try {
      const tokenAccount = await getAssociatedTokenAddress(
        new PublicKey(tokenAddress),
        this.provider.publicKey
      );

      if (await this.hasTokenAccount(tokenAccount)) {
        const tokenBalance = await connection.getTokenAccountBalance(tokenAccount);
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

  async transfer({ vaultAddress, amount }) {
    try {
      const mint = new PublicKey(tokenAddress);
      const vault = new PublicKey(vaultAddress);
      const tokenAccount = await getAssociatedTokenAddress(mint, this.provider.publicKey);

      const result = await PublicKey.findProgramAddress(
        [Buffer.from('SisuBridge', 'utf8')],
        bridgeProgramId
      );

      const bridgePda = result[0];

      const data = new TransferOutData({
        amount: new BN(900),
        tokenAddress: '0x1234',
        chainId: 123,
        recipient: 'someone',
      });

      const payload = serialize(TransferOutDataSchema, data);

      let instructions = [];

      if (await this.hasTokenAccount(tokenAccount)) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            this.provider.publicKey,
            tokenAccount,
            this.provider.publicKey,
            mint
          )
        );
      }

      instructions.push(
        createApproveCheckedInstruction(
          tokenAccount,
          mint,
          vault,
          this.provider.publicKey,
          amount * 1e8,
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
              pubkey: mint,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: tokenAccount,
              isSigner: false,
              isWritable: true,
            },
            {
              pubkey: vault,
              isSigner: false,
              isWritable: true,
            },
            {
              pubkey: bridgePda,
              isSigner: false,
              isWritable: true,
            },
          ],
          data: Buffer.from(new Uint8Array([1, ...payload])),
          programId: bridgeProgramId,
        })
      );

      const transaction = new Transaction().add(...instructions);

      transaction.feePayer = provider.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const { signature } = await this.provider.signAndSendTransaction(transaction);

      await connection.getSignatureStatus(signature);
    } catch (error) {
      throw error;
    }
  }
}

export default SolanaLibrary;
