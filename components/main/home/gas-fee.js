import { useEffect } from 'react';

import useAsync from 'hooks/useAsync';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import { getGasFeeInToken } from 'request/rest';
import { convertNumberToString } from 'utils/transform';

function GasFee() {
  const { srcChain, srcToken } = useChain();
  const { connected } = useWeb3();
  const { execute, value } = useAsync(getGasFeeInToken);

  useEffect(() => {
    if (connected && srcChain && srcChain.transferName && srcToken && srcToken.symbol) {
      execute({ chain: srcChain.transferName, tokenId: srcToken.symbol });
    }
  }, [execute, connected, srcChain, srcToken]);

  return (
    <div>
      {value ? (
        <span>
          Gas fee: <strong>{convertNumberToString(value.gas_cost)}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default GasFee;
