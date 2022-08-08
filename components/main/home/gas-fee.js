import { useEffect } from 'react';

import useError from 'hooks/useError';
import useChain from 'hooks/useChain';
import useToken from 'hooks/useToken';
import useWeb3 from 'hooks/useWeb3';
import useWeb3Update from 'hooks/useWeb3Update';
import { getGasFeeInToken } from 'request/rest';
import { convertNumberToString } from 'utils/transform';

function GasFee() {
  const { chainInfos, srcChain, destChain } = useChain();
  const { token } = useToken();
  const setError = useError();
  const { chainId, gasPrice, wallet } = useWeb3();
  const { setGasPrice } = useWeb3Update();

  useEffect(() => {
    if (
      chainInfos &&
      srcChain &&
      Number.isInteger(chainId) &&
      chainInfos[srcChain].id === chainId &&
      token &&
      wallet
    ) {
      getGasFeeInToken({ chain: destChain, tokenId: token })
        .then(({ data }) => {
          const gasPrice = data?.gas_cost;

          if (Number.isInteger(gasPrice)) {
            const gasCost = gasPrice === 0 ? '0' : convertNumberToString(gasPrice);
            setGasPrice(gasCost);
          }
        })
        .catch((error) => {
          setGasPrice(null);
          setError(error, { silent: true });
        });
    } else {
      setGasPrice(null);
    }
  }, [chainId, chainInfos, srcChain, destChain, token, wallet, setError, setGasPrice]);

  return (
    <div>
      {gasPrice ? (
        <span>
          Gas fee: <strong>{`${gasPrice} ${token}`}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default GasFee;
