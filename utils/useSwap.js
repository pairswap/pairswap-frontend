import { useCallback } from 'react';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import ERC20Gateway from 'abis/ERC20Gateway.json';
import { SISU_SRC_GW, SISU_SRC_TOKEN, SISU_DEST_TOKEN } from 'config/addresses';
import useWeb3 from 'utils/useWeb3';
import { convertDecimalsToBigNumber } from 'utils/string';

function useSwap() {
  const { account, library } = useWeb3();

  const transfer = useCallback(
    async ({
      destChain = 'ganache2',
      recipient = account,
      tokenOut = SISU_SRC_TOKEN,
      tokenIn = SISU_DEST_TOKEN,
      amount = BigNumber.from(1),
    }) => {
      const signer = await library.getSigner(account);
      const contract = new Contract(SISU_SRC_GW, ERC20Gateway.abi, signer);

      const uintAmount = convertDecimalsToBigNumber(`${amount}`);
      console.log({ uintAmount });

      const transaction = await contract.TransferOut(
        destChain,
        recipient,
        tokenOut,
        tokenIn,
        uintAmount
      );

      await transaction.wait();
    },
    [account, library]
  );

  return { transfer };
}

export default useSwap;
