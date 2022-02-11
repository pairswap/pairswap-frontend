import { useContext } from 'react';

import { TokenContext, TokenUpdateContext } from 'contexts/token';

export function useToken() {
  const context = useContext(TokenContext);

  if (typeof context === 'undefined') {
    throw new Error('useToken must be used within a TokenProvider');
  }

  return context;
}

export function useUpdateToken() {
  const context = useContext(TokenUpdateContext);

  if (typeof context === 'undefined') {
    throw new Error('useUpdateToken must be used within a TokenProvider');
  }

  return context;
}
