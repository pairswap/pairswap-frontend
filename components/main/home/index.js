import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isAddress } from '@ethersproject/address';

import { ETHEREUM, CARDANO } from 'constants/wallet';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import { CSL } from 'utils/cardano';
import SrcChainInput from './chain-input/src-chain-input';
import DestChainInput from './chain-input/dest-chain-input';
import PendingModal from './pending-modal';
import SuccessModal from './success-modal';
import GasFee from './gas-fee';
import SwapButton from './swap-button';
import TokenBalance from './token-balance';
import TokenInput from './token-input';
import AddressInput from './address-input';

const SubmitButton = dynamic(() => import('./submit-button'), { ssr: false });

function isValidAddress(type, address) {
  switch (type) {
    case ETHEREUM:
      return isAddress(address);
    case CARDANO:
      try {
        CSL.Address.from_bech32(address);
        return true;
      } catch (error) {
        return false;
      }
    default:
      return true;
  }
}

function Main() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [links, setLinks] = useState(null);
  const { gasPrice, tokenBalance } = useWeb3();
  const { chainInfos, srcChain, destChain } = useChain();

  function getChainTypeInfos() {
    let srcType, destType;

    if (chainInfos && srcChain && destChain) {
      srcType = chainInfos[srcChain].type;
      destType = chainInfos[destChain].type;
    }

    return {
      srcType,
      destType,
      isTheSame: srcType === destType,
    };
  }

  const chainTypeInfos = getChainTypeInfos();

  const schema = yup.object({
    amount: yup
      .number()
      .typeError('Amount is invalid')
      .required('Amount is required')
      .moreThan(0, 'Amount must greater than 0')
      .test('notEnoughToken', 'Do not have enough tokens', function (value) {
        return value + Number(gasPrice) <= Number(tokenBalance);
      }),
    recipient: yup
      .string()
      .test('required', "Recipient's address is required", function (value) {
        const { isTheSame } = chainTypeInfos;

        return isTheSame ? true : Boolean(value);
      })
      .test('valid', "Recipient's address is invalid", function (value) {
        const { isTheSame, destType } = chainTypeInfos;

        return isTheSame ? true : isValidAddress(destType, value);
      }),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { amount: 0, recipient: '' }, resolver: yupResolver(schema) });

  return (
    <main className="main">
      <div className="card">
        <div className="form-group">
          <div className="form-group__title">Select a token</div>
          <TokenInput {...register('amount')} />
          <p className="validation">{errors.amount?.message}</p>
        </div>

        {chainTypeInfos.isTheSame ? null : (
          <div className="form-group">
            <div className="form-group__title"></div>
            <AddressInput {...register('recipient')} />
            <p className="validation">{errors.recipient?.message}</p>
          </div>
        )}

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

        <SubmitButton
          setIsPending={setIsPending}
          setIsSuccess={setIsSuccess}
          setTxHash={setTxHash}
          setLinks={setLinks}
          onSubmit={handleSubmit}
          isSameChainType={chainTypeInfos.isTheSame}
          onSuccess={() => reset({ amount: 0, recipient: '' })}
        />
        <PendingModal open={isPending} txHash={txHash} />
        <SuccessModal
          open={isSuccess}
          links={links}
          onClose={() => {
            setIsSuccess(false);
            setTxHash(null);
          }}
        />
      </div>
    </main>
  );
}

export default Main;
