import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';

import SrcChainInput from './chain-input/src-chain-input';
import DestChainInput from './chain-input/dest-chain-input';
import GasFee from './gas-fee';
import SwapButton from './swap-button';
import TokenBalance from './token-balance';
import TokenInput from './token-input';

const SubmitButton = dynamic(() => import('./submit-button'), { ssr: false });

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

  return (
    <main className="main">
      <div className="card">
        <div className="form-group">
          <div className="form-group__title">Select a token</div>
          <TokenInput register={register} {...register('amount', validationRules.amount)} />
          <p className="validation">{errorMessages.amount[errors.amount?.type]}</p>
        </div>

        <div className="form-group__footer">
          <GasFee />
          <TokenBalance />
        </div>

        <div className="card__divider" />

        <div className="form-group">
          <SwapButton />
          <SrcChainInput />
          <DestChainInput />
        </div>

        <SubmitButton onSubmit={(cb) => handleSubmit(cb)} onSuccess={() => reset({ amount: '' })} />
      </div>
    </main>
  );
}

export default Main;
