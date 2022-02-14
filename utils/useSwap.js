import { useCallback } from 'react';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import ERC20Gateway from 'abis/ERC20Gateway.json';
import useNotification from 'utils/useNotification';
import { useWeb3 } from 'utils/useWeb3';
import { convertStringToBigNumber } from 'utils/transform';

function useSwap() {
  const { showMessage } = useNotification();
  const { account } = useWeb3();

  const transfer = useCallback(
    async ({ contractAddress, destChain, recipient, tokenOut, tokenIn, amount }) => {
      if (Number(amount) === 0) {
        showMessage({
          message: 'Please enter a token amount',
          type: 'error',
        });

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
        showMessage({
          message: 'You have made a transaction',
          type: 'success',
        });

        await transaction.wait();
      } catch (error) {
        console.error(error);
        // User denied transaction signature.
        if (error.code === 4001) {
          showMessage({
            message: 'Please accept transaction signature to continue',
            type: 'error',
          });
        } else {
          showMessage({
            message: 'An unknown error occurred. Check the console for more details',
            type: 'error',
          });
        }
      }
    },
    [account, showMessage]
  );

  return { transfer };
}

export default useSwap;
