import { useEffect } from 'react';

import useError from 'hooks/useError';
import useChain from 'hooks/useChain';
import useToken from 'hooks/useToken';
import useWeb3 from 'hooks/useWeb3';
import useWeb3Update from 'hooks/useWeb3Update';
import { getGasFeeInToken } from 'request/rest';
import { convertNumberToString } from 'utils/transform';

function GasFee() {
  const { destChain } = useChain();
  const { token } = useToken();
  const setError = useError();
  const { chainId, gasPrice, wallet } = useWeb3();
  const { setGasPrice } = useWeb3Update();

  useEffect(() => {
    if (wallet && Number.isInteger(chainId) && token) {
      getGasFeeInToken({ chain: destChain, tokenId: token })
        .then(({ data }) => {
          if (data?.gas_cost) {
            const gasCost = convertNumberToString(data.gas_cost);
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
  }, [chainId, destChain, token, wallet, setError, setGasPrice]);

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
