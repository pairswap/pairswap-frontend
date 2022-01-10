import { createContext } from 'react';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';

import connectors from 'config/connectors';
import { shortenAccount, shortenBalance } from 'utils/string';
import useAuthorize from 'utils/useAuthorize';
import useBalance from 'utils/useBalance';
import useListener from 'utils/useListener';

export const Web3ReactStateContext = createContext();

function getLibrary(provider) {
  const library = new EthersWeb3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function Web3ReactStateProvider({ children }) {
  const { account, activate, active, chainId, connector, deactivate, error, library } =
    useWeb3React();
  const balance = useBalance();

  useAuthorize();
  useListener();

  return (
    <Web3ReactStateContext.Provider
      value={{
        account: shortenAccount(account),
        activate,
        active,
        balance: shortenBalance(balance),
        chainId,
        connector,
        connectors,
        deactivate,
        error,
        library,
      }}
    >
      {children}
    </Web3ReactStateContext.Provider>
  );
}

function Web3Provider({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactStateProvider>{children}</Web3ReactStateProvider>
    </Web3ReactProvider>
  );
}

export default Web3Provider;
