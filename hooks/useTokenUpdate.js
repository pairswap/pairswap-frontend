import { useContext } from 'react';

import { TokenContextUpdate } from 'contexts/token';

function useTokenUpdate() {
  const state = useContext(TokenContextUpdate);

  return state;
}

export default useTokenUpdate;
