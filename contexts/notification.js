import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { errorMessages } from 'constants/errors';
import Toast from 'components/toast';
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
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const { error } = useWeb3();
  const { clearError } = useWeb3Update();

  const showMessage = useCallback(({ message, type }) => {
    setType(type);
    setMessage(message);
    setShowToast(true);
  }, []);

  useEffect(() => {
    if (error) {
      showMessage({ message: getErrorMessage(error), type: 'error' });
    }
  }, [error, showMessage]);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <Toast
        open={showToast}
        message={message}
        type={type}
        onClose={() => {
          setShowToast(false);
          clearError();
        }}
      />
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationProvider;
