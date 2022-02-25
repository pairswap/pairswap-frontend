import { useState, useEffect } from 'react';
import shallow from 'zustand/shallow';

import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import { getGasFeeInToken } from 'utils/rest';
import { convertNumberToString } from 'utils/transform';

function GasFee() {
  const [fee, setFee] = useState();
  const { srcChain, srcToken } = useChain(
    (state) => ({
      srcChain: state.srcChain,
      srcToken: state.srcToken,
    }),
    shallow
  );
  const connected = useWeb3((state) => state.connected);

  useEffect(() => {
    if (connected && srcChain && srcToken) {
      getGasFeeInToken(srcChain.transferName, srcToken.symbol).then(({ gas_cost: gasFee }) =>
        setFee(convertNumberToString(gasFee))
      );
    } else {
      setFee();
    }
  }, [, connected, srcChain, srcToken]);

  return (
    <div>
      {fee ? (
        <span>
          Gas fee: <strong>{fee}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default GasFee;
