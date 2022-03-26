import { useEffect } from 'react';

import useAsync from 'hooks/useAsync';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import { getTokenBalance } from 'request/rpc';
import { shortenBalance, convertBigNumberToString } from 'utils/transform';

function TokenBalance() {
  const { execute, value } = useAsync(getTokenBalance);
  const { srcToken } = useChain();
  const { account, connected, chainId } = useWeb3();

  useEffect(() => {
    if (connected && srcToken && srcToken.address) {
      execute({ account, tokenAddress: srcToken.address });
    }
  }, [account, connected, chainId, srcToken, execute]);

  return (
    <div>
      {connected && value ? (
        <span>
          Balance:{' '}
          <strong>{`${shortenBalance(convertBigNumberToString(value))} ${srcToken.symbol}`}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default TokenBalance;
