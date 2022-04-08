import { useCallback } from 'react';

import useChain from 'hooks/useChain';
import useError from 'hooks/useError';
import useWeb3 from 'hooks/useWeb3';

function SwapButton() {
  const { destChain, swapChain } = useChain();
  const setError = useError();
  const { connected, library } = useWeb3();

  const handleClick = useCallback(() => {
    if (connected) {
      library
        .changeChain(destChain)
        .then(() => swapChain())
        .catch((error) => {
          if (error.code === 4902) {
            library
              .addChain(destChain)
              .then(() => swapChain())
              .catch((error) => setError(error));
          } else {
            setError(error);
          }
        });
    } else {
      swapChain();
    }
  }, [connected, library, destChain, swapChain, setError]);

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
