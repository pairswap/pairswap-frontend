import { useContext } from 'react';

import { ErrorContext } from 'contexts/error';

function useError() {
  const state = useContext(ErrorContext);

  return state;
}

export default useError;
