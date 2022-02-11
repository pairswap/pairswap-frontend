import { createContext } from 'react';
import PropTypes from 'prop-types';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';

import connectors from 'config/connectors';
import { shortenAccount, shortenBalance } from 'utils/transform';
import useAuth from 'utils/useAuth';
import useBalance from 'utils/useBalance';
import useListener from 'utils/useListener';

export const Web3ReactStateContext = createContext();

function getLibrary(provider) {
  const library = new EthersWeb3Provider(provider);
  return library;
}

function Web3ReactStateProvider({ children }) {
  const { account, activate, active, chainId, connector, deactivate, error, library } =
    useWeb3React();
  const balance = useBalance();

  useAuth();
  useListener();

  return (
    <Web3ReactStateContext.Provider
      value={{
        account,
        shortenAccount: shortenAccount(account),
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

Web3ReactStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function Web3Provider({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactStateProvider>{children}</Web3ReactStateProvider>
    </Web3ReactProvider>
  );
}

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Web3Provider;
