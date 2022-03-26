import { useContext } from 'react';

import { Web3Context } from 'contexts/web3';

function useWeb3() {
  const state = useContext(Web3Context);

  return state;
}

export default useWeb3;
