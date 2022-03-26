import { useContext } from 'react';

import { ChainContext } from 'contexts/chain';

function useChain() {
  const state = useContext(ChainContext);

  return state;
}

export default useChain;
