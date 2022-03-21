import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const validationRules = {
  name: {
    required: true,
  },
  email: {
    required: true,
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  txUrl: {
    required: true,
    pattern: /^https?:\/\/.*\/tx\/0x.+$/,
  },
};

const errorMessages = {
  name: {
    required: 'Name is required',
  },
  email: {
    required: 'Email is required',
    pattern: 'Email is invalid',
  },
  txUrl: {
    required: 'Transaction link is required',
    pattern: 'Transaction link is invalid',
  },
};

function Main() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(({ name, email, txUrl, comment }) => {
    console.log({ name, email, txUrl, comment });
  }, []);

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
        <label htmlFor="txUrl" className="support__label">
          Your transaction on block explorer
        </label>
        <input
          id="txUrl"
          type="url"
          placeholder="Eg: https://bscscan.com/tx/0x1234...."
          className="support__input"
          {...register('txUrl', validationRules.txUrl)}
        />
        <p className="support__helper-text">{errorMessages.txUrl[errors.txUrl?.type]}</p>
        <label htmlFor="comment" className="support__label">
          Additional comment
        </label>
        <textarea id="comment" rows={4} className="support__input" {...register('comment')} />
        <button onClick={handleSubmit(onSubmit)} className="support__button">
          Send
        </button>
      </form>
    </main>
  );
}

export default Main;
