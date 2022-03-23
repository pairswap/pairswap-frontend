import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import ChainInput from './chain-input';
import TokenInput from './token-input';
import GasFee from './gas-fee';
import TokenBalance from './token-balance';
import useAsync from 'hooks/useAsync';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import useError from 'hooks/useError';
import useSuccess from 'hooks/useSuccess';
import { convertStringToBigNumber } from 'utils/transform';

const validationRules = {
  amount: {
    required: true,
    validate: (value) => Number(value) > 0,
  },
};

const errorMessages = {
  amount: {
    required: 'Please enter a value',
    validate: 'Value must greater than 0',
  },
};

function Main() {
  const {
    register,
    reset,
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
  const setMessage = useSuccess((state) => state.setMessage);
  const setHash = useSuccess((state) => state.setHash);
  const { available, connected, chainId, addChain, changeChain, getTokenBalance, transfer } =
    useWeb3(
      (state) => ({
        available: state.available,
        connected: state.connected,
        chainId: state.chainId,
        chainId: state.chainId,
        addChain: state.addChain,
        changeChain: state.changeChain,
        getTokenBalance: state.getTokenBalance,
        transfer: state.transfer,
      }),
      shallow
    );
  const { execute, value, loading, error } = useAsync(transfer);

  const onSubmit = useCallback(
    ({ amount }) => {
      if (available) {
        if (connected) {
          execute({
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
    [available, connected, execute, srcChain, destChain, srcToken, destToken, setError]
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
    if (value) {
      setHash(value.hash);
      setMessage('You have made a transaction');
      reset({ amount: '' });
      getTokenBalance(srcToken.address);
    }
  }, [value, getTokenBalance, reset, srcToken, setMessage, setHash]);

  useEffect(() => {
    if (error) {
      setError(error);
      reset({ amount: '' });
    }
  }, [error, reset, setError]);

  useEffect(() => {
    if (connected && chainId) {
      sync(chainId);
    }
  }, [connected, chainId, sync]);

  return (
    <main className="main">
      <div className="card">
        <div className="form-group">
          <div className="form-group__title">Select a token</div>
          <TokenInput
            register={register}
            tokens={srcChain.tokens}
            selectedToken={srcToken}
            setSelectedToken={selectToken}
            {...register('amount', validationRules.amount)}
          />
          <p className="validation">{errorMessages.amount[errors.amount?.type]}</p>
        </div>

        <div className="form-group__footer">
          <GasFee />
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

        {loading ? (
          <div className="btn-swap">
            <div className="spiner" />
          </div>
        ) : (
          <button onClick={handleSubmit(onSubmit)} className="btn-swap">
            Swap
          </button>
        )}
      </div>
    </main>
  );
}

export default Main;
