import { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Address } from '@emurgo/cardano-serialization-lib-asmjs';

import { METAMASK, COINBASE, NAMI } from 'constants/wallet';
import useToken from 'hooks/useToken';
import useChain from 'hooks/useChain';
import useError from 'hooks/useError';
import useLocalStorage from 'hooks/useLocalStorage';
import { hasProvider, getLibrary } from 'utils/provider';
import { convertHexStringToNumber } from 'utils/transform';

const ethereumBasedWallets = [METAMASK, COINBASE];
const cardanoBasedWallets = [NAMI];

export const Web3Context = createContext();
export const Web3ContextUpdate = createContext();

function Web3Provider({ children }) {
  const [wallet, setWallet] = useLocalStorage('wallet', null);
  const [account, setAccount] = useState(null);
  const [library, setLibrary] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [gasPrice, setGasPrice] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const { chainInfos, srcChain } = useChain();
  const { tokenInfos, token } = useToken();
  const setError = useError();

  const connect = useCallback(
    async (name) => {
      if (!hasProvider(name)) {
        setError(new Error(`No ${name} extenstion installed`));
        return;
      }

      const library = getLibrary(name);
      await library.init();
      setLibrary(library);

      try {
        await library.connect();
        setWallet(name);
      } catch (error) {
        setError(error);
      }
    },
    [setError, setWallet]
  );

  const logout = useCallback(() => {
    setWallet(null);
    setAccount(null);
    setBalance(null);
    setChainId(null);
  }, [setWallet]);

  const getAccount = useCallback(async () => {
    if (!library) return;

    try {
      const account = await library.getAccount();
      setAccount(account);
    } catch (error) {
      setError(error, { slient: true });
    }
  }, [library, setError]);

  const getBalance = useCallback(async () => {
    if (!library || !account) return;

    try {
      const balance = await library.getBalance(account);
      setBalance(balance);
    } catch (error) {
      setError(error, { silent: true });
    }
  }, [account, library, setError]);

  const getChainId = useCallback(async () => {
    if (!library) return;

    try {
      const chainId = await library.getChainId();
      if (chainInfos[srcChain].id === chainId) {
        setChainId(chainId);
      }
    } catch (error) {
      setError(error, { silent: true });
    }
  }, [library, setError, chainInfos, srcChain]);

  const getTokenBalance = useCallback(async () => {
    if (!library || !account || !tokenInfos || !token || !srcChain) return;

    try {
      const { addresses } = tokenInfos[token];
      const tokenAddress = addresses[srcChain];
      const tokenBalance = await library.getTokenBalance({ account, tokenAddress });
      setTokenBalance(tokenBalance);
    } catch (error) {
      setError(error, { silent: true });
    }
  }, [account, library, srcChain, tokenInfos, token, setError]);

  const reloadBalance = useCallback(async () => {
    await getBalance();
    await getTokenBalance();
  }, [getBalance, getTokenBalance]);

  useEffect(() => {
    if (wallet) {
      getTokenBalance();
    }
  }, [wallet, getTokenBalance]);

  useEffect(() => {
    if (account && Number.isInteger(chainId)) {
      reloadBalance();
    }
  }, [account, chainId, reloadBalance]);

  useEffect(() => {
    if (wallet) {
      if (library) {
        getAccount();
        getChainId();
      } else {
        const library = getLibrary(wallet);
        library.init().then(() => setLibrary(library));
      }
    }
  }, [account, wallet, library, getAccount, getBalance, getChainId]);

  useEffect(() => {
    if (chainInfos && srcChain) {
      const { wallets } = chainInfos[srcChain];

      if (!wallets.includes(wallet)) {
        logout();
      }
    }
  }, [wallet, chainInfos, srcChain, logout]);

  useEffect(() => {
    if (chainInfos && srcChain && chainInfos[srcChain].id !== chainId) {
      setChainId(null);
    }
  }, [chainId, chainInfos, srcChain]);

  useEffect(() => {
    if (library?.provider && wallet && ethereumBasedWallets.includes(wallet)) {
      function onChainChanged(hexChainId) {
        const chainId = convertHexStringToNumber(hexChainId);
        if (chainInfos[srcChain].id === chainId) {
          setChainId(chainId);
        }
      }

      function onAccountsChanged(accounts) {
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }

      library.provider.on('chainChanged', onChainChanged);
      library.provider.on('accountsChanged', onAccountsChanged);

      return () => {
        library.provider.removeListener('chainChanged', onChainChanged);
        library.provider.removeListener('accountsChanged', onAccountsChanged);
      };
    }
  }, [library, wallet, chainInfos, srcChain]);

  useEffect(() => {
    if (library?.provider && wallet && cardanoBasedWallets.includes(wallet)) {
      function onChainChanged(chainId) {
        if (chainInfos[srcChain].id === chainId) {
          setChainId(chainId);
        } else {
          setChainId(null);
        }
      }

      function onAccountsChanged(accounts) {
        if (accounts && accounts.length > 0) {
          setAccount(Address.from_bytes(Buffer.from(accounts[0], 'hex')).to_bech32());
        }
      }

      library.provider.experimental.on('networkChange', onChainChanged);
      library.provider.experimental.on('accountChange', onAccountsChanged);

      return () => {
        library.provider.experimental.off('networkChange', onChainChanged);
        library.provider.experimental.off('accountChange', onAccountsChanged);
      };
    }
  }, [library, wallet, chainInfos, srcChain]);

  return (
    <Web3ContextUpdate.Provider value={{ connect, logout, reloadBalance, setGasPrice }}>
      <Web3Context.Provider
        value={{ account, balance, chainId, gasPrice, library, tokenBalance, wallet }}
      >
        {children}
      </Web3Context.Provider>
    </Web3ContextUpdate.Provider>
  );
}

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Web3Provider;
