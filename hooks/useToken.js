import { useContext } from 'react';

import { TokenContext } from 'contexts/token';

function useToken() {
  const state = useContext(TokenContext);

  return state;
}

export default useToken;
