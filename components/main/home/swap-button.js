import { useCallback } from 'react';

import useChainUpdate from 'hooks/useChainUpdate';
import useChain from 'hooks/useChain';
import useError from 'hooks/useError';
import useWeb3 from 'hooks/useWeb3';

function SwapButton() {
  const { swap } = useChainUpdate();
  const { destChain } = useChain();
  const setError = useError();
  const { connected, library } = useWeb3();

  const handleClick = useCallback(() => {
    if (connected) {
      library
        .changeChain(destChain)
        .then(() => swap())
        .catch((error) => {
          if (error.code === 4902) {
            library
              .addChain(destChain)
              .then(() => swap())
              .catch((error) => setError(error));
          } else {
            setError(error);
          }
        });
    } else {
      swap();
    }
  }, [connected, destChain, library, setError, swap]);

  return (
    <div className="form-group__title">
      Swap Chain
      <button onClick={handleClick} className="btn-swap-chain">
        <img src="/images/swap-chain.svg" alt="swap chain" className="btn-swap-chain__img" />
      </button>
    </div>
  );
}

export default SwapButton;
