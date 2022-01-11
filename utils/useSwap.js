import { Contract } from '@ethersproject/contracts';

const address = '';
const abi = {};

function useSwap() {
  const contract = new Contract(address, abi);

  async function swap() {
    await contract.TransferOut();
  }

  return { swap };
}

export default useSwap;
