import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import SuccessModal from './success-modal';
import useAsync from 'hooks/useAsync';
import useError from 'hooks/useError';
import { support } from 'request/rest';

const validationRules = {
  name: {
    required: true,
  },
  email: {
    required: true,
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  txURL: {
    required: true,
    pattern: /^https?:\/\/.*\/tx\/0x.+$/,
  },
  comment: {
    required: true,
  },
};

const errorMessages = {
  name: {
    required: 'Please enter your name',
  },
  email: {
    required: 'Please enter your email',
    pattern: 'Email is invalid',
  },
  txURL: {
    required: 'Please provide a transaction link',
    pattern: 'Transaction link is invalid',
  },
  comment: {
    required: 'Please leave a comment',
  },
};

function Main() {
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const { execute, value, loading, error } = useAsync(support);
  const setError = useError();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    async ({ name, email, txURL, comment }) => {
      execute({ name, email, txURL, comment });
    },
    [execute]
  );

  useEffect(() => {
    if (error) {
      setError(new Error('An unknown error occurred'));
    }
  }, [error, setError]);

  useEffect(() => {
    if (value) {
      setOpenModal(true);
      setModalMessage('Your report has been sent');
      reset();
    }
  }, [value, reset]);

  return (
    <main className="main">
      <div className="support-title">Request for support</div>
      <form className="support">
        <label htmlFor="name" className="support__label">
          Name
        </label>
        <input id="name" className="support__input" {...register('name', validationRules.name)} />
        <p className="support__helper-text">{errorMessages.name[errors.name?.type]}</p>
        <label htmlFor="email" className="support__label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="support__input"
          {...register('email', validationRules.email)}
        />
        <p className="support__helper-text">{errorMessages.email[errors.email?.type]}</p>
        <label htmlFor="txURL" className="support__label">
          Your transaction on block explorer
        </label>
        <input
          id="txURL"
          type="url"
          placeholder="Eg: https://bscscan.com/tx/0x1234...."
          className="support__input"
          {...register('txURL', validationRules.txURL)}
        />
        <p className="support__helper-text">{errorMessages.txURL[errors.txURL?.type]}</p>
        <label htmlFor="comment" className="support__label">
          Additional comment
        </label>
        <textarea
          id="comment"
          rows={4}
          className="support__input"
          placeholder="Please describe your problem in detail so that we can assist you as quickly as possible"
          {...register('comment', validationRules.comment)}
        />
        <p className="support__helper-text">{errorMessages.comment[errors.comment?.type]}</p>
        {loading ? (
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
