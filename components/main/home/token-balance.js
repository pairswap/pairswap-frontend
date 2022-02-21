import { useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import SampleERC20 from 'abis/SampleERC20.json';
import { convertBigNumberToString, shortenBalance } from 'utils/transform';
import { useToken } from 'utils/useToken';
import { useWeb3 } from 'utils/useWeb3';

function TokenBalance() {
  const [tokenBalance, setTokenBalance] = useState();
  const { selectedSourceToken } = useToken();
  const { account } = useWeb3();

  useEffect(() => {
    if (account && selectedSourceToken) {
      const provider = new Web3Provider(window.ethereum);
      const contract = new Contract(selectedSourceToken.address, SampleERC20.abi, provider);

      contract
        .balanceOf(account)
        .then((balance) => setTokenBalance(convertBigNumberToString(balance)))
        .catch((error) => console.error(error));
    }
  }, [account, selectedSourceToken]);

  return (
    <span className="token-balance">
      Balance: <strong>{tokenBalance ? shortenBalance(tokenBalance) : 0}</strong>
    </span>
  );
}

export default TokenBalance;
