import { useEffect } from 'react';

import useError from 'hooks/useError';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import useWeb3Update from 'hooks/useWeb3Update';
import { getGasFeeInToken } from 'request/rest';
import { convertNumberToString } from 'utils/transform';

function GasFee() {
  const { destChain, destToken, tokenSymbol } = useChain();
  const setError = useError();
  const { connected, gasPrice, supported } = useWeb3();
  const { setGasPrice } = useWeb3Update();

  useEffect(() => {
    if (connected && supported && destToken) {
      getGasFeeInToken({ chain: destChain.transferName, tokenId: destToken.symbol })
        .then((value) => {
          if (value?.gas_cost) {
            const gasCost = convertNumberToString(value.gas_cost);
            setGasPrice(gasCost);
          }
        })
        .catch((error) => setError(error, { silent: true }));
    } else {
      setGasPrice(null);
    }
  }, [connected, supported, destChain, destToken, setError, setGasPrice]);

  return (
    <div>
      {gasPrice ? (
        <span>
          Gas fee: <strong>{`${gasPrice} ${tokenSymbol}`}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default GasFee;
