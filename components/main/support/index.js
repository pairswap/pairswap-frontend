import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import SuccessModal from './success-modal';
import useError from 'hooks/useError';
import { support } from 'request/rest';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  txURL: yup
    .string()
    .required('Transaction link is required')
    .matches(/^https?:\/\/.*\/tx\/0x.+$/, 'Transaction link is invalid'),
  comment: yup.string().required('Comment is required'),
});

function Main() {
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const setError = useError();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit({ name, email, txURL, comment }) {
    setIsLoading(true);
    try {
      await support({ name, email, txURL, comment });
      setOpenModal(true);
      setModalMessage('Your report has been sent');
      reset();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="main">
      <div className="support-title">Request for support</div>
      <form className="support">
        <label htmlFor="name" className="support__label">
          Name
        </label>
        <input id="name" className="support__input" {...register('name')} />
        <p className="support__helper-text">{errors.name?.message}</p>
        <label htmlFor="email" className="support__label">
          Email
        </label>
        <input id="email" type="email" className="support__input" {...register('email')} />
        <p className="support__helper-text">{errors.email?.message}</p>
        <label htmlFor="txURL" className="support__label">
          Your transaction on block explorer
        </label>
        <input
          id="txURL"
          type="url"
          placeholder="Eg: https://bscscan.com/tx/0x1234...."
          className="support__input"
          {...register('txURL')}
        />
        <p className="support__helper-text">{errors.txURL?.message}</p>
        <label htmlFor="comment" className="support__label">
          Additional comment
        </label>
        <textarea
          id="comment"
          rows={4}
          className="support__input"
          placeholder="Please describe your problem in detail so that we can assist you as quickly as possible"
          {...register('comment')}
        />
        <p className="support__helper-text">{errors.comment?.message}</p>
        {isLoading ? (
          <div className="support__button">
            <div className="spiner" />
          </div>
        ) : (
          <button onClick={handleSubmit(onSubmit)} className="support__button">
            Send
          </button>
        )}
      </form>
      <SuccessModal
        open={openModal}
        message={modalMessage}
        onClose={() => {
          setOpenModal(false);
          setModalMessage(null);
        }}
      />
    </main>
  );
}

export default Main;
