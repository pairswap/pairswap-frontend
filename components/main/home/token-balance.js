import { useEffect } from 'react';
import shallow from 'zustand/shallow';

import { shortenBalance } from 'utils/transform';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';

function TokenBalance() {
  const srcToken = useChain((state) => state.srcToken);
  const { connected, tokenBalance, getTokenBalance } = useWeb3(
    (state) => ({
      connected: state.connected,
      tokenBalance: state.tokenBalance,
      getTokenBalance: state.getTokenBalance,
    }),
    shallow
  );

  useEffect(() => {
    if (connected && srcToken && srcToken.address) {
      getTokenBalance(srcToken.address);
    }
  }, [connected, srcToken, getTokenBalance]);

  return (
    <div>
      {tokenBalance ? (
        <span>
          Balance: <strong>{`${shortenBalance(tokenBalance)} ${srcToken.symbol}`}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default TokenBalance;
