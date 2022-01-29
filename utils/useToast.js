import { useContext } from 'react';

import { ToastContext } from 'contexts/toast';

function useToast() {
  const context = useContext(ToastContext);

  if (typeof context === 'undefined') {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export default useToast;
