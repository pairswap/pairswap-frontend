import { useCallback } from 'react';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import ERC20Gateway from 'abis/ERC20Gateway.json';
import useError from 'hooks/useError';
import useSuccess from 'hooks/useSuccess';
import { useWeb3 } from 'utils/useWeb3';
import { convertStringToBigNumber } from 'utils/transform';

function useSwap() {
  const setError = useError((state) => state.setError);
  const setMessage = useSuccess((state) => state.setMessage);
  const { account } = useWeb3();

  const transfer = useCallback(
    async ({ contractAddress, destChain, recipient, tokenOut, tokenIn, amount }) => {
      if (Number(amount) === 0) {
        setError(new Error('Invalid token amount'));
        return;
      }

      const uintAmount = convertStringToBigNumber(`${amount}`);
      console.log({ contractAddress, destChain, recipient, tokenOut, tokenIn, amount: uintAmount });

      try {
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner(account);
        const contract = new Contract(contractAddress, ERC20Gateway.abi, signer);

        const transaction = await contract.transferOut(
          destChain,
          recipient,
          tokenOut,
          tokenIn,
          uintAmount
        );
        setMessage('You have made a transaction');

        await transaction.wait();
      } catch (error) {
        console.error(error);
        setError(error);
      }
    },
    [account, setError, setMessage]
  );

  return { transfer };
}

export default useSwap;
