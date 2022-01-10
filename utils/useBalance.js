import { useEffect, useState } from 'react';
import { formatUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';

function useBalance() {
  const [balance, setBalance] = useState();
  const { account, chainId, library } = useWeb3React();

  useEffect(() => {
    if (!!account && !!library) {
      library
        .getBalance(account)
        .then((balance) => {
          setBalance(formatUnits(balance, 18));
        })
        .catch(() => {
          setBalance(undefined);
        });
    }
  }, [account, library, chainId]);

  return balance;
}

export default useBalance;
