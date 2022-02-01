import { useContext } from 'react';

import { NotificationContext } from 'contexts/notification';

function useNotification() {
  const context = useContext(NotificationContext);

  if (typeof context === 'undefined') {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return context;
}

export default useNotification;
