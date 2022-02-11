import { useContext } from 'react';

import { ChainContext, ChainUpdateContext } from 'contexts/chain';

export function useChain() {
  const context = useContext(ChainContext);

  if (typeof context === 'undefined') {
    throw new Error('useChain must be used within a ChainProvider');
  }

  return context;
}

export function useUpdateChain() {
  const context = useContext(ChainUpdateContext);

  if (typeof context === 'undefined') {
    throw new Error('useUpdateChain must be used within a ChainProvider');
  }

  return context;
}
