import { useContext } from 'react';
import { Web3Context, Web3UpdateContext } from 'contexts/web3';

export function useWeb3() {
  const context = useContext(Web3Context);

  if (typeof context === 'undefined') {
    throw new Error('useWeb3 must be used within a MetamaskProvider');
  }

  return context;
}

export function useWeb3Update() {
  const context = useContext(Web3UpdateContext);

  if (typeof context === 'undefined') {
    throw new Error('useWeb3Update must be used within a MetamaskProvider');
  }

  return context;
}
