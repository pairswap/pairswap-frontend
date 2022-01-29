import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import ErrorToast from 'components/toast/error';
import SuccessToast from 'components/toast/success';

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <ToastContext.Provider value={{ setShowError, setShowSuccess }}>
      {children}
      <SuccessToast open={showSuccess} onClose={() => setShowSuccess(false)} />
      <ErrorToast open={showError} onClose={() => setShowError(false)} />
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastProvider;
