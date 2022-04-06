import { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import useError from 'hooks/useError';
import useChain from 'hooks/useChain';
import * as rpcRequest from 'request/rpc';
import {
  convertBigNumberToString,
  convertHexStringToNumber,
  convertHexStringToString,
} from 'utils/transform';
import { getChainIds } from 'utils/chain';
import { available, metamaskProvider } from 'utils/provider';

export const Web3Context = createContext();

function Web3Provider({ children }) {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [supported, setSupported] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(null);
  const { chains, sync, srcToken } = useChain();
  const setError = useError();

  const getBalance = useCallback(
    (account) => {
      return rpcRequest
        .getBalance(account)
        .then((balance) => setBalance(convertHexStringToString(balance)))
        .catch((error) => setError(error));
    },
    [setError]
  );

  const getTokenBalance = useCallback(() => {
    return rpcRequest
      .getTokenBalance({ account, tokenAddress: srcToken.address })
      .then((newTokenBalance) => {
        setTokenBalance(convertBigNumberToString(newTokenBalance));
      })
      .catch((error) => setError(error, { silent: true }));
  }, [account, srcToken, setError]);

  const reloadBalance = useCallback(async () => {
    await getBalance(account);
    await getTokenBalance();
  }, [account, getBalance, getTokenBalance]);

  const connect = useCallback(() => {
    rpcRequest
      .requestAccounts()
      .then((accounts) => {
        setConnected(true);
        setAccount(accounts[0]);
        getBalance(accounts[0]);
      })
      .catch((error) => setError(error));
  }, [getBalance, setError]);

  const switchToSupportedChain = useCallback(() => {
    return rpcRequest.changeChain(chains[0]).catch((error) => {
      if (error.code === 4902) {
        rpcRequest.addChain(chains[0]).catch((error) => setError(error));
      } else {
        setError(error);
      }
    });
  }, [chains, setError]);

  const reset = useCallback(() => {
    setConnected(false);
    setAccount(null);
    setBalance(null);
    setChainId(null);
  }, []);

  useEffect(() => {
    if (account && supported && srcToken?.address) {
      getTokenBalance();
    }
  }, [account, supported, srcToken, getTokenBalance]);

  useEffect(() => {
    if (available) {
      const supportedChainIds = getChainIds({ chains });
      rpcRequest
        .getAccounts()
        .then((accounts) => {
          if (accounts[0]) {
            setConnected(true);
            setAccount(accounts[0]);
            getBalance(accounts[0]);
          }
        })
        .catch((error) => setError(error, { silent: true }));

      rpcRequest
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
          if (connected) {
            setError(new Error('Unsupported network'));
          }
        }
      }

      function onAccountsChanged(accounts) {
        if (accounts.length > 0) {
          setConnected(true);
          setAccount(accounts[0]);
          getBalance(accounts[0]);
        } else {
          reset();
        }
      }

      if (metamaskProvider.on && metamaskProvider.removeListener) {
        metamaskProvider.on('chainChanged', onChainChanged);
        metamaskProvider.on('accountsChanged', onAccountsChanged);

        return () => {
          metamaskProvider.removeListener('chainChanged', onChainChanged);
          metamaskProvider.removeListener('accountsChanged', onAccountsChanged);
        };
      }
    } else {
      setError(new Error('No metamask installed'));
    }
  }, [
    account,
    chainId,
    chains,
    connected,
    getBalance,
    reset,
    setError,
    sync,
    switchToSupportedChain,
  ]);

  return (
    <Web3Context.Provider
      value={{
        available,
        connected,
        account,
        balance,
        supported,
        tokenBalance,
        chainId,
        connect,
        reloadBalance,
        switchToSupportedChain,
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
