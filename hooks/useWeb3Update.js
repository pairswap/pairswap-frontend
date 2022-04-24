import { useContext } from 'react';

import { Web3ContextUpdate } from 'contexts/web3';

function useWeb3Update() {
  const state = useContext(Web3ContextUpdate);

  return state;
}

export default useWeb3Update;
