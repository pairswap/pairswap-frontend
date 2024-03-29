import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import ErrorModal from 'components/modal/error';

export const ErrorContext = createContext();

const cardanoMessages = {
  '-3': 'User rejected the request.',
  2: 'User rejected the request.',
};

const ethereumMessages = {
  '-32001': 'Resource not found.',
  '-32002': 'Have a pending request from metamask',
  '-32003': 'Transaction rejected.',
  '-32004': 'Method not supported.',
  '-32005': 'Request limit exceeded.',
  '-32603': 'Internal JSON-RPC error. Please change the RPC URL.',
  4001: 'User rejected the request.',
  4100: 'The requested account and/or method has not been authorized.',
  4200: 'The requested method is not supported by this Ethereum provider.',
  4900: 'The provider is disconnected from all chains.',
  4901: 'The provider is disconnected from the specified chain.',
};

const errorMessages = { ...ethereumMessages, ...cardanoMessages };

function getErrorMessage(error) {
  if (!error.code) {
    if (error.message) {
      return error.message;
    }

    return 'An unknown error occurred. Please retry or reload the browser.';
  } else {
    if (errorMessages[error.code]) {
      return errorMessages[error.code];
    }

    return 'An unknown error occurred. Please retry or reload the browser.';
  }
}

function ErrorProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [canClose, setCanClose] = useState(true);

  const setError = useCallback((error, options = {}) => {
    const { silent = false, canClose = true } = options;
    console.error(error);
    setCanClose(canClose);

    if (!silent) {
      setOpenModal(true);
      setMessage(getErrorMessage(error));
    }
  }, []);

  return (
    <ErrorContext.Provider value={setError}>
      {children}
      <ErrorModal
        open={openModal}
        message={message}
        canClose={canClose}
        onClose={() => {
          setOpenModal(false);
          setMessage(null);
        }}
      />
    </ErrorContext.Provider>
  );
}

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorProvider;
