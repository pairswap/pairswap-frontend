import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import ChainInput from './chain-input';
import TokenInput from './token-input';
import TokenBalance from './token-balance';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import useError from 'hooks/useError';
import { convertStringToBigNumber } from 'utils/transform';

function Main() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    chains,
    srcChain,
    destChain,
    srcToken,
    destToken,
    selectToken,
    selectSrcChain,
    selectDestChain,
    sync,
    swapChain,
  } = useChain();
  const setError = useError((state) => state.setError);
  const { available, connected, chainId, addChain, changeChain, transfer } = useWeb3(
    (state) => ({
      available: state.available,
      connected: state.connected,
      chainId: state.chainId,
      chainId: state.chainId,
      addChain: state.addChain,
      changeChain: state.changeChain,
      transfer: state.transfer,
    }),
    shallow
  );

  const onSubmit = useCallback(
    ({ amount }) => {
      if (available) {
        if (connected) {
          transfer({
            contractAddress: srcChain.gatewayAddress,
            destChain: destChain.transferName,
            tokenOut: srcToken.address,
            tokenIn: destToken.address,
            amount: convertStringToBigNumber(amount),
          });
        } else {
          setError(new Error('No wallet connected'));
        }
      } else {
        setError(new Error('No metamask installed'));
      }
    },
    [available, connected, srcChain, destChain, srcToken, destToken, transfer, setError]
  );

  const handleChangeSrcChain = useCallback(
    (chain) => {
      if (connected) {
        changeChain(chain)
          .then(() => selectSrcChain(chain))
          .catch((error) => {
            if (error.code === 4902) {
              addChain(chain)
                .then(() => selectSrcChain(chain))
                .catch((error) => setError(error));
            } else {
              setError(error);
            }
          });
      } else {
        selectSrcChain(chain);
      }
    },
    [connected, addChain, changeChain, selectSrcChain, setError]
  );

  const handleSwapChain = useCallback(() => {
    if (connected) {
      changeChain(destChain)
        .then(() => swapChain())
        .catch((error) => {
          if (error.code === 4902) {
            addChain(destChain)
              .then(() => swapChain())
              .catch((error) => setError(error));
          } else {
            setError(error);
          }
        });
    } else {
      swapChain();
    }
  }, [connected, destChain, addChain, changeChain, swapChain, setError]);

  useEffect(() => {
    if (connected && chainId) {
      sync(chainId);
    }
  }, [connected, chainId, sync]);

  return (
    <main className="main">
      <form className="card">
        <div className="form-group">
          <div className="form-group__title">Select a token</div>
          <TokenInput
            register={register}
            tokens={srcChain.tokens}
            selectedToken={srcToken}
            setSelectedToken={selectToken}
          />
          {errors.amount?.type === 'required' && (
            <p className="validation">This field is required</p>
          )}
        </div>

        <div className="form-group__footer">
          <TokenBalance />
        </div>

        <div className="card__divider" />

        <div className="form-group">
          <div className="form-group__title">
            Swap Chain
            <button onClick={handleSwapChain} className="btn-swap-chain">
              <img src="/images/swap-chain.svg" alt="swap chain" className="btn-swap-chain__img" />
            </button>
          </div>

          <ChainInput
            label="From"
            chains={chains}
            disabledChain={destChain}
            selectedChain={srcChain}
            setSelectedChain={handleChangeSrcChain}
          />
          <ChainInput
            label="To"
            chains={chains}
            disabledChain={srcChain}
            selectedChain={destChain}
            setSelectedChain={selectDestChain}
          />
        </div>

        <button onClick={handleSubmit(onSubmit)} className="btn-swap">
          Swap
        </button>
      </form>
    </main>
  );
}

export default Main;
