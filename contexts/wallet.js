import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { shortenAddress } from 'utils/string';

const WalletContext = createContext();

const Status = {
  NOT_INSTALLED: 'not_installed',
  NOT_CONNECTED: 'not_connected',
  CONNECTED: 'connected',
};

export function WalletProvier({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState(Status.NOT_CONNECTED);
  const currentAccount = accounts[0];

  const connect = useCallback(async () => {
    const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setStatus(Status.CONNECTED);
    setAccounts(_accounts);
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.selectedAddress) {
        setAccounts([window.ethereum.selectedAddress]);
        setStatus(Status.CONNECTED);
      }
    } else {
      setStatus(Status.NOT_INSTALLED);
    }

    function handleChangeAccounts(_accounts) {
      setAccounts(_accounts);
    }

    window.ethereum.on('accountsChanged', handleChangeAccounts);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleChangeAccounts);
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        currentAccount,
        shortenAccount: shortenAddress(currentAccount),
        isConnected: status === Status.CONNECTED,
        connect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const wallet = useContext(WalletContext);

  if (typeof wallet === 'undefined') {
    throw new Error('useWallet must be used within a WalletProvier');
  }

  return wallet;
}
