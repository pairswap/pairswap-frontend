import { useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import SampleERC20 from 'abis/SampleERC20.json';
import { convertBigNumberToString, shortenBalance } from 'utils/transform';
import useChain from 'hooks/useChain';
import { useWeb3 } from 'utils/useWeb3';

function TokenBalance() {
  const [tokenBalance, setTokenBalance] = useState();
  const srcToken = useChain((state) => state.srcToken);
  const { account } = useWeb3();

  useEffect(() => {
    if (account && srcToken) {
      const provider = new Web3Provider(window.ethereum);
      const contract = new Contract(srcToken.address, SampleERC20.abi, provider);

      contract
        .balanceOf(account)
        .then((balance) => setTokenBalance(convertBigNumberToString(balance)))
        .catch((error) => console.error(error));
    }
  }, [account, srcToken]);

  return (
    <span className="token-balance">
      Balance: <strong>{tokenBalance ? shortenBalance(tokenBalance) : 0}</strong>
    </span>
  );
}

export default TokenBalance;
