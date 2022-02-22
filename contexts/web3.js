import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  convertHexStringToString,
  convertHexStringToNumber,
  converNumberToHexString,
} from 'utils/transform';
import supportedChains from 'config/chains';

export const Web3Context = createContext();
export const Web3UpdateContext = createContext();

const supportedChainIds = supportedChains.map((chain) => chain.chainId);

function Web3Provider({ children }) {
  const [account, setAccount] = useState('');
  const [active, setActive] = useState(false);
  const [balance, setBalance] = useState('');
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);

  const connect = useCallback(async () => {
    return ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => setAccount(accounts[0]))
      .catch((error) => setError(error));
  }, []);

  const addChain = useCallback((newChain) => {
    ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: converNumberToHexString(newChain.chainId),
            chainName: newChain.chainName,
            nativeCurrency: newChain.nativeCurrency,
            rpcUrls: newChain.rpcUrls,
          },
        ],
      })
      .catch((error) => setError(error));
  }, []);

  const changeChain = useCallback(
    (newChain) => {
      ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: converNumberToHexString(newChain.chainId) }],
        })
        .catch((error) => {
          setError(error);
          if (error.code === 4902) {
            addChain(newChain);
          }
        });
    },
    [addChain]
  );

  function clearError() {
    setError(null);
  }

  useEffect(() => {
    if (account) {
      ethereum
        .request({ method: 'eth_getBalance', params: [account, 'latest'] })
        .then((newBalance) => setBalance(convertHexStringToString(newBalance)))
        .catch((error) => setError(error));
    }
  }, [account]);

  useEffect(() => {
    if (window.ethereum) {
      ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts[0]) {
            setActive(true);
            setAccount(accounts[0]);
          }
        })
        .catch((error) => setError(error));

      ethereum
        .request({ method: 'eth_chainId' })
        .then((newChainId) => handleChainChanged(newChainId))
        .catch((error) => setError(error));

      function handleConnect() {
        console.log('Event: connect');
      }

      function handleChainChanged(newChainId) {
        console.log('Event: change chain');
        const convertedChainId = convertHexStringToNumber(newChainId);
        if (supportedChainIds.includes(convertedChainId)) {
          setChainId(convertedChainId);
        } else {
          setError(new Error('Unsupported chain.'));
          // Switch to chain with index 0
          changeChain(supportedChains[0]);
        }
      }

      function handleAccountsChanged(newAccounts) {
        console.log('Event: account chain');

        if (newAccounts.length > 0) {
          setActive(true);
          setAccount(newAccounts[0]);
        } else {
          window.location.reload();
        }
      }

      if (ethereum.on && ethereum.removeListener) {
        ethereum.on('connect', handleConnect);
        ethereum.on('chainChanged', handleChainChanged);
        ethereum.on('accountsChanged', handleAccountsChanged);

        return () => {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
      }
    } else {
      setError(new Error('No metamask installed'));
    }
  }, [changeChain]);

  return (
    <Web3Context.Provider value={{ account, active, balance, chainId, error }}>
      <Web3UpdateContext.Provider value={{ connect, changeChain, clearError }}>
        {children}
      </Web3UpdateContext.Provider>
    </Web3Context.Provider>
  );
}

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Web3Provider;
