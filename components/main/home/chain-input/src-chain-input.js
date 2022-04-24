import { useCallback } from 'react';

import BaseInput from './base-input';
import useChain from 'hooks/useChain';
import useChainUpdate from 'hooks/useChainUpdate';
import useError from 'hooks/useError';
import useWeb3 from 'hooks/useWeb3';

function SrcChainInput() {
  const { supportedChains, srcChain, destChainId } = useChain();
  const { setSrcChainId } = useChainUpdate();
  const setError = useError();
  const { connected, library } = useWeb3();

  const setChainId = useCallback(
    (chainId) => {
      const chain = supportedChains.find((chain) => chain.chainId === chainId);

      if (connected) {
        library
          .changeChain(chain)
          .then(() => setSrcChainId(chain.chainId))
          .catch((error) => {
            if (error.code === 4902) {
              library
                .addChain(chain)
                .then(() => setSrcChainId(chain.chainId))
                .catch((error) => setError(error));
            } else {
              setError(error);
            }
          });
      } else {
        setSrcChainId(chain.id);
      }
    },
    [connected, library, setError, setSrcChainId, supportedChains]
  );

  return (
    <BaseInput
      label="From"
      chain={srcChain}
      setChainId={setChainId}
      excludedChainId={destChainId}
    />
  );
}

export default SrcChainInput;
