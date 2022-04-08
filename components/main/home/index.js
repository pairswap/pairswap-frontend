import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import ChainInput from './chain-input';
import GasFee from './gas-fee';
import SubmitButton from './submit-button';
import SwapButton from './swap-button';
import TokenBalance from './token-balance';
import TokenInput from './token-input';
import useChain from 'hooks/useChain';
import useError from 'hooks/useError';
import useWeb3 from 'hooks/useWeb3';

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
  const { chains, srcChain, destChain, srcToken, selectToken, selectSrcChain, selectDestChain } =
    useChain();
  const setError = useError();
  const { connected, library } = useWeb3();

  const handleChangeSrcChain = useCallback(
    (chain) => {
      if (connected) {
        library
          .changeChain(chain)
          .then(() => selectSrcChain(chain))
          .catch((error) => {
            if (error.code === 4902) {
              library
                .addChain(chain)
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
    [connected, library, selectSrcChain, setError]
  );

  return (
    <main className="main">
      <div className="card">
        <div className="form-group">
          <div className="form-group__title">Select a token</div>
          <TokenInput
            register={register}
            tokens={srcChain?.tokens}
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
          <SwapButton />

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

        <SubmitButton onSubmit={(cb) => handleSubmit(cb)} onSuccess={() => reset({ amount: '' })} />
      </div>
    </main>
  );
}

export default Main;
