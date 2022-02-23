import { useState, useEffect } from 'react';
import shallow from 'zustand/shallow';

import { shortenBalance } from 'utils/transform';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';

function TokenBalance() {
  const [tokenBalance, setTokenBalance] = useState();
  const srcToken = useChain((state) => state.srcToken);
  const { connected, getTokenBalance } = useWeb3(
    (state) => ({
      connected: state.connected,
      getTokenBalance: state.getTokenBalance,
    }),
    shallow
  );

  useEffect(() => {
    if (connected && srcToken) {
      getTokenBalance(srcToken.address).then((balance) => {
        if (balance) {
          setTokenBalance(balance);
        }
      });
    } else {
      setTokenBalance();
    }
  }, [connected, srcToken, getTokenBalance]);

  if (tokenBalance) {
    return (
      <span className="token-balance">
        Balance: <strong>{`${shortenBalance(tokenBalance)} ${srcToken.symbol}`}</strong>
      </span>
    );
  }

  return null;
}

export default TokenBalance;
