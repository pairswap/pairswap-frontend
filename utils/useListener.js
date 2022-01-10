import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

function useListener() {
  const { activate, active, error } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error) {
      function handleConnect() {
        activate(injected);
      }

      function handleChainChanged() {
        activate(injected);
      }

      function handleAccountsChanged(accounts) {
        if (accounts.length > 0) {
          activate(injected);
        }
      }

      function handleNetworkChanged() {
        activate(injected);
      }

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, activate]);
}

export default useListener;
