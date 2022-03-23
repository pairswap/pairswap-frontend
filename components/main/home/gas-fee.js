import { useEffect } from 'react';
import shallow from 'zustand/shallow';

import useAsync from 'hooks/useAsync';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import { getGasFeeInToken } from 'utils/rest';
import { convertNumberToString } from 'utils/transform';

function GasFee() {
  const { srcChain, srcToken } = useChain(
    (state) => ({
      srcChain: state.srcChain,
      srcToken: state.srcToken,
    }),
    shallow
  );
  const connected = useWeb3((state) => state.connected);
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
