import { useState, useEffect } from 'react';

import useError from 'hooks/useError';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import { getGasFeeInToken } from 'request/rest';
import { convertNumberToString } from 'utils/transform';

function GasFee() {
  const [gasCost, setGasCost] = useState(null);
  const { srcChain, srcToken } = useChain();
  const setError = useError();
  const { connected, supported } = useWeb3();

  useEffect(() => {
    if (connected && supported && srcToken) {
      getGasFeeInToken({ chain: srcChain.transferName, tokenId: srcToken.symbol })
        .then((value) => {
          if (value?.gas_cost) {
            setGasCost(value.gas_cost);
          }
        })
        .catch((error) => setError(error, { silent: true }));
    } else {
      setGasCost(null);
    }
  }, [connected, supported, srcChain, srcToken, setError]);

  return (
    <div>
      {gasCost ? (
        <span>
          Gas fee: <strong>{convertNumberToString(gasCost)}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default GasFee;
