import { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import useChain from 'hooks/useChain';
import useError from 'hooks/useError';
import useLocalStorage from 'hooks/useLocalStorage';
import RPCRequest from 'request/rpc';
import {
  convertBigNumberToString,
  convertHexStringToNumber,
  convertHexStringToString,
} from 'utils/transform';
import { getChainIds } from 'utils/chain';
import { getProvider, hasProvider } from 'utils/provider';

export const Web3Context = createContext();

function Web3Provider({ children }) {
  const [connected, setConnected] = useLocalStorage('connected', null);
  const [library, setLibrary] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [supported, setSupported] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(null);
  const { chains, sync, srcToken } = useChain();
  const setError = useError();

  const getBalance = useCallback(
    (account) => {
      return library
        .getBalance(account)
        .then((balance) => setBalance(convertHexStringToString(balance)))
        .catch((error) => setError(error));
    },
    [library, setError]
  );

  const getTokenBalance = useCallback(() => {
    return library
      .getTokenBalance({ account, tokenAddress: srcToken.address })
      .then((newTokenBalance) => {
        setTokenBalance(convertBigNumberToString(newTokenBalance));
      })
      .catch((error) => setError(error, { silent: true }));
  }, [account, library, srcToken, setError]);

  const reloadBalance = useCallback(async () => {
    await getBalance(account);
    await getTokenBalance();
  }, [account, getBalance, getTokenBalance]);

  const connect = useCallback(
    (providerName) => {
      if (!hasProvider(providerName)) {
        return Promise.reject(new Error(`No ${providerName} extenstion installed`));
      }

      const provider = getProvider(providerName);
      const library = new RPCRequest(provider);
      setLibrary(library);

      return library
        .requestAccounts()
        .then(() => setConnected(providerName))
        .catch((error) => setError(error));
    },
    [setConnected, setError]
  );

  const switchToSupportedChain = useCallback(() => {
    return library.changeChain(chains[0]).catch((error) => {
      if (error.code === 4902) {
        library.addChain(chains[0]).catch((error) => setError(error));
      } else {
        setError(error);
      }
    });
  }, [chains, library, setError]);

  const logout = useCallback(() => {
    setConnected(null);
    setAccount(null);
    setBalance(null);
    setChainId(null);
  }, [setConnected]);

  useEffect(() => {
    if (account && supported && srcToken?.address) {
      getTokenBalance();
    }
  }, [account, supported, srcToken, getTokenBalance]);

  useEffect(() => {
    if (connected && !library) {
      const provider = getProvider(connected);
      const library = new RPCRequest(provider);
      setLibrary(library);
    }
  }, [connected, library]);

  useEffect(() => {
    if (connected && library) {
      const supportedChainIds = getChainIds({ chains });
      library
        .getAccounts()
        .then((accounts) => {
          if (accounts[0]) {
            setAccount(accounts[0]);
            getBalance(accounts[0]);
          }
        })
        .catch((error) => setError(error, { silent: true }));

      library
        .getChainId()
        .then((chainId) => onChainChanged(chainId))
        .catch((error) => setError(error, { silent: true }));

      function onChainChanged(chainId) {
        const convertedChainId = convertHexStringToNumber(chainId);
        if (supportedChainIds.includes(convertedChainId)) {
          setSupported(true);
          setChainId(convertedChainId);

          if (account) {
            sync(convertedChainId);
            getBalance(account);
          }
        } else {
          setSupported(false);
          setError(new Error('Unsupported network'));
        }
      }

      function onAccountsChanged(accounts) {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          getBalance(accounts[0]);
        } else {
          logout();
        }
      }

      if (library.provider.on && library.provider.removeListener) {
        library.provider.on('chainChanged', onChainChanged);
        library.provider.on('accountsChanged', onAccountsChanged);

        return () => {
          library.provider.removeListener('chainChanged', onChainChanged);
          library.provider.removeListener('accountsChanged', onAccountsChanged);
        };
      }
    }
  }, [
    account,
    chainId,
    chains,
    connected,
    getBalance,
    logout,
    library,
    setConnected,
    setError,
    sync,
    switchToSupportedChain,
  ]);

  return (
    <Web3Context.Provider
      value={{
        account,
        balance,
        chainId,
        connect,
        connected,
        library,
        logout,
        reloadBalance,
        supported,
        switchToSupportedChain,
        tokenBalance,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Web3Provider;
