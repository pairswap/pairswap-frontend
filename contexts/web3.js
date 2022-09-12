import { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { WALLETS, ETHEREUM, CARDANO } from 'constants/wallet';
import useToken from 'hooks/useToken';
import useChain from 'hooks/useChain';
import useError from 'hooks/useError';
import useLocalStorage from 'hooks/useLocalStorage';
import { CSL } from 'utils/cardano';
import { hasProvider, getLibrary } from 'utils/provider';
import { convertHexStringToNumber } from 'utils/transform';

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
  const { chainInfos, srcChain, destChain } = useChain();
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
    setTokenBalance(null);
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
      setChainId(chainId);
    } catch (error) {
      setError(error, { silent: true });
    }
  }, [library, setError]);

  const getTokenBalance = useCallback(async () => {
    if (!library || !account || !chainInfos || !tokenInfos || !token || !srcChain) return;

    try {
      const { addresses } = tokenInfos[token];
      const tokenAddress = addresses[srcChain];
      const { id, rpcs } = chainInfos[srcChain];
      const tokenBalance = await library.getTokenBalance({
        account,
        tokenAddress,
        rpcUrl: rpcs?.[0],
        chainId: id,
      });
      setTokenBalance(tokenBalance);
    } catch (error) {
      setError(error, { silent: true });
    }
  }, [account, library, srcChain, chainInfos, tokenInfos, token, setError]);

  const reloadBalance = useCallback(async () => {
    if (Number.isInteger(chainId) && srcChain && chainInfos) {
      await getBalance();
      await getTokenBalance();
    } else {
      setBalance(null);
      setTokenBalance(null);
    }
  }, [chainId, chainInfos, srcChain, getBalance, getTokenBalance]);

  useEffect(() => {
    if (wallet && account && srcChain && destChain) {
      reloadBalance();
    }
  }, [account, wallet, srcChain, destChain, reloadBalance]);

  useEffect(() => {
    if (wallet) {
      if (library) {
        if (library.isEnabled) {
          getAccount();
          getChainId();
        } else {
          logout();
        }
      } else {
        const library = getLibrary(wallet);
        library.init().then(() => setLibrary(library));
      }
    }
  }, [account, wallet, library, getAccount, getChainId, logout]);

  useEffect(() => {
    if (chainInfos && srcChain) {
      const { type } = chainInfos[srcChain];

      if (!WALLETS[type].includes(wallet)) {
        logout();
      }
    }
  }, [wallet, chainInfos, srcChain, logout]);

  useEffect(() => {
    if (library?.provider && wallet && WALLETS[ETHEREUM].includes(wallet)) {
      function onChainChanged(hexChainId) {
        const chainId = convertHexStringToNumber(hexChainId);
        setChainId(chainId);
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
    if (library?.provider && wallet && WALLETS[CARDANO].includes(wallet)) {
      function onChainChanged(chainId) {
        setChainId(chainId);
      }

      function onAccountsChanged(accounts) {
        if (accounts && accounts.length > 0) {
          setAccount(CSL.Address.from_bytes(Buffer.from(accounts[0], 'hex')).to_bech32());
        }
      }

      if (library.provider.experimental?.on) {
        library.provider.experimental.on('networkChange', onChainChanged);
        library.provider.experimental.on('accountChange', onAccountsChanged);
      } else {
        library.provider.onNetworkChange(onChainChanged);
        library.provider.onAccountChange(onAccountsChanged);
      }

      return () => {
        if (library.provider?.experimental.off) {
          library.provider.experimental.off('networkChange', onChainChanged);
          library.provider.experimental.off('accountChange', onAccountsChanged);
        }
      };
    }
  }, [library, wallet, chainInfos, srcChain]);

  return (
    <Web3ContextUpdate.Provider value={{ connect, logout, reloadBalance, setGasPrice }}>
      <Web3Context.Provider
        value={{
          account,
          balance,
          chainId,
          gasPrice,
          library,
          tokenBalance,
          wallet,
        }}
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
