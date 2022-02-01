import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';

import Toast from 'components/toast';
import useWeb3 from 'utils/useWeb3';

export const NotificationContext = createContext();

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'Please install Metamask extension';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network";
  } else if (error instanceof UserRejectedRequestError) {
    return 'Please authorize this website to continue';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details';
  }
}

function NotificationProvider({ children }) {
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const { error } = useWeb3();

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
      <Toast open={showToast} message={message} type={type} onClose={() => setShowToast(false)} />
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationProvider;
