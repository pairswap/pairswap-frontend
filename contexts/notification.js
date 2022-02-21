import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { errorMessages } from 'constants/errors';
import ErrorModal from 'components/modal/error';
import SuccessModal from 'components/modal/success';
import { useWeb3, useWeb3Update } from 'utils/useWeb3';

export const NotificationContext = createContext();

function getErrorMessage(error) {
  if (!error.code) {
    return error.message;
  }

  if (errorMessages[error.code]) {
    return errorMessages[error.code];
  }

  console.error(error.message);
  return 'An unknown error occurred. Check the console for more details';
}

function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { error } = useWeb3();
  const { clearError } = useWeb3Update();

  const showMessage = useCallback(({ message, type }) => {
    setMessage(message);
    if (type === 'error') {
      setShowErrorModal(true);
    } else {
      setShowSuccessModal(true);
    }
  }, []);

  const onClose = useCallback(
    (type) => {
      if (type === 'error') {
        setShowErrorModal(false);
        clearError();
      } else {
        setShowSuccessModal(false);
      }
    },
    [clearError]
  );

  useEffect(() => {
    if (error) {
      showMessage({ message: getErrorMessage(error), type: 'error' });
    }
  }, [error, showMessage]);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <ErrorModal open={showErrorModal} onClose={() => onClose('error')} message={message} />
      <SuccessModal open={showSuccessModal} onClose={() => onClose('success')} message={message} />
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationProvider;
