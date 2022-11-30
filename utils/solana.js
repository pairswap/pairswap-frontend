const {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
} = require('@solana/web3.js');
const {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} = require('@solana/spl-token');
import { PHANTOM } from 'constants/wallet';
import { hasProvider, getProvider } from 'utils/provider';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export async function createTokenAccount(tokenAddress, recipient) {
  const mintPubkey = new PublicKey(tokenAddress);
  const ownerPubkey = new PublicKey(recipient);

  if (!hasProvider(PHANTOM)) {
    throw new Error(`No ${PHANTOM} extenstion installed`);
  }

  const provider = getProvider(PHANTOM);

  if (!provider.isConnected) {
    await provider.connect();
  }

  const balance = await connection.getBalance(provider.publicKey);

  if (balance / LAMPORTS_PER_SOL < 1) {
    const signature = await connection.requestAirdrop(provider.publicKey, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature);
  }

  const ata = await getAssociatedTokenAddress(mintPubkey, ownerPubkey, true);
  const info = await connection.getAccountInfo(ata, 'confirmed');

  if (info) {
    return ata;
  }

  const transaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(provider.publicKey, ata, ownerPubkey, mintPubkey)
  );

  transaction.feePayer = provider.publicKey;
  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  const { signature } = await provider.signAndSendTransaction(transaction);
  await connection.getSignatureStatus(signature);

  return ata;
}
