import { useContext } from 'react';

import { ChainContextUpdate } from 'contexts/chain';

function useChainUpdate() {
  const state = useContext(ChainContextUpdate);

  return state;
}

export default useChainUpdate;
