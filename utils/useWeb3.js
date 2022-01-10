import { useContext } from 'react';

import { Web3ReactStateContext } from 'contexts/web3';

function useWeb3() {
  const context = useContext(Web3ReactStateContext);

  if (typeof context === 'undefined') {
    throw new Error('useWeb3 must be used within a Web3ReactStateProvider');
  }

  return context;
}

export default useWeb3;
