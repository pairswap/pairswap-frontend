import { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import supportedChains from 'config/chains';
import useError from 'hooks/useError';
import useChain from 'hooks/useChain';
import * as rpcRequest from 'request/rpc';
import { convertHexStringToNumber, convertHexStringToString } from 'utils/transform';

export const Web3Context = createContext();
const supportedChainIds = supportedChains.map((chain) => chain.chainId);
const available = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

function Web3Provider({ children }) {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const { sync } = useChain();
  const setError = useError();

  const getBalance = useCallback(
    (account) => {
      rpcRequest
        .getBalance(account)
        .then((balance) => setBalance(convertHexStringToString(balance)))
        .catch((error) => setError(error));
    },
    [setError]
  );

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

  const reset = useCallback(() => {
    setConnected(false);
    setAccount(null);
    setBalance(null);
    setChainId(null);
  }, []);

  useEffect(() => {
    if (available) {
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
          setChainId(convertedChainId);

          if (account) {
            sync(convertedChainId);
            getBalance(account);
          }
        } else {
          if (connected) {
            rpcRequest.changeChain(supportedChains[0]).catch((error) => {
              if (error.code === 4902) {
                rpcRequest.addChain(supportedChains[0]).catch((error) => setError(error));
              } else {
                setError(error);
              }
            });
          }
        }
      }

      function onAccountsChanged(accounts) {
        if (accounts.length > 0) {
          setConnected(true);
          setAccount(accounts[0]);
          getBalance(accounts[0]);

          if (!supportedChainIds.includes(chainId)) {
            rpcRequest.changeChain(supportedChains[0]).catch((error) => {
              if (error.code === 4902) {
                rpcRequest
                  .addChain(supportedChains[0])
                  .catch((error) => setError(error, { silent: true }));
              } else {
                setError(error, { silent: true });
              }
            });
          } else {
            sync(chainId);
          }
        } else {
          reset();
        }
      }

      if (ethereum.on && ethereum.removeListener) {
        ethereum.on('chainChanged', onChainChanged);
        ethereum.on('accountsChanged', onAccountsChanged);

        return () => {
          ethereum.removeListener('chainChanged', onChainChanged);
          ethereum.removeListener('accountsChanged', onAccountsChanged);
        };
      }
    } else {
      setError(new Error('No metamask installed'));
    }
  }, [account, chainId, connected, getBalance, reset, setError]);

  return (
    <Web3Context.Provider
      value={{
        available,
        connected,
        account,
        balance,
        chainId,
        connect,
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
