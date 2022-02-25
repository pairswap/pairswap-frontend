import { useEffect } from 'react';
import shallow from 'zustand/shallow';

import { shortenBalance } from 'utils/transform';
import useAsync from 'hooks/useAsync';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';

function TokenBalance() {
  const srcToken = useChain((state) => state.srcToken);
  const { connected, getTokenBalance } = useWeb3(
    (state) => ({
      connected: state.connected,
      getTokenBalance: state.getTokenBalance,
    }),
    shallow
  );
  const { execute, value } = useAsync(getTokenBalance);

  useEffect(() => {
    if (connected && srcToken && srcToken.address) {
      execute(srcToken.address);
    }
  }, [connected, srcToken, execute]);

  return (
    <div>
      {value ? (
        <span>
          Balance: <strong>{`${shortenBalance(value)} ${srcToken.symbol}`}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default TokenBalance;
