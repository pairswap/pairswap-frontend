import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { ethers } from 'ethers';
import useLocalStorage from 'utils/useLocalStorage';
import { shortenAddress, shortenBalance } from 'utils/string';

const WalletContext = createContext();

export function WalletProvier({ children }) {
  const [isConnected, setIsConnected] = useLocalStorage('connected', false);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState();
  const [chainId, setChainId] = useState();
  const onboarding = useRef();

  const getInfo = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _accounts = await provider.send('eth_requestAccounts', []);
    const _balance = await provider.getBalance(_accounts[0]);
    const _network = await provider.getNetwork();
    setAccounts(_accounts);
    setBalance(ethers.utils.formatUnits(_balance, 18));
    setChainId(_network.chainId);
    setIsConnected(true);
  }, [setIsConnected]);

  async function connect() {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      await getInfo();
    } else {
      onboarding.current.startOnboarding();
    }
  }

  function resetInfo() {
    setAccounts([]);
    setBalance(undefined);
    setChainId(undefined);
  }

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        onboarding.current.stopOnboarding();
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleChangeAccounts(_accounts) {
      getInfo();

      // All account have disconnected
      if (_accounts.length === 0) {
        setIsConnected(false);
      }
    }

    function handleChangeChain(_chainId) {
      getInfo();
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (isConnected) {
        getInfo();
      } else {
        resetInfo();
      }

      window.ethereum.on('accountsChanged', handleChangeAccounts);
      window.ethereum.on('chainChanged', handleChangeChain);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleChangeAccounts);
        window.ethereum.removeListener('chainChanged', handleChangeChain);
      };
    }
  }, [isConnected, setIsConnected, getInfo]);

  return (
    <WalletContext.Provider
      value={{
        chainId,
        shortenAccount: shortenAddress(accounts[0]),
        shortenBalance: shortenBalance(balance),
        isConnected,
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
