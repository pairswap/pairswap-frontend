import { useCallback } from 'react';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import ERC20Gateway from 'abis/ERC20Gateway.json';
import { SISU_SRC_GW, SISU_SRC_TOKEN, SISU_DEST_TOKEN } from 'config/addresses';
import useNotification from 'utils/useNotification';
import useWeb3 from 'utils/useWeb3';
import { convertDecimalsToBigNumber } from 'utils/transform';

function useSwap() {
  const { showMessage } = useNotification();
  const { account, library } = useWeb3();

  const transfer = useCallback(
    async ({
      destChain = 'ganache2',
      recipient = account,
      tokenOut = SISU_SRC_TOKEN,
      tokenIn = SISU_DEST_TOKEN,
      amount = BigNumber.from(1),
    }) => {
      if (Number(amount) === 0) {
        showMessage({
          message: 'Please enter a token amount',
          type: 'error',
        });

        return;
      }

      const uintAmount = convertDecimalsToBigNumber(`${amount}`);

      try {
        const signer = await library.getSigner(account);
        const contract = new Contract(SISU_SRC_GW, ERC20Gateway.abi, signer);

        const transaction = await contract.TransferOut(
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
        // MetaMask Tx Signature: User denied transaction signature.
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
    [account, library, showMessage]
  );

  return { transfer };
}

export default useSwap;
