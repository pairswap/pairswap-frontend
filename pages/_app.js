import 'styles/global.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Script from 'next/script';

import { WalletModal, WalletModalContext } from 'components/modal/select-wallet';
import ChainProvider from 'contexts/chain';
import TokenProvider from 'contexts/token';
import ErrorProvider from 'contexts/error';
import Web3Provider from 'contexts/web3';

function App({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>KO Exchange</title>
      </Head>

      <Script type="text/javascript" src="config.js" strategy="beforeInteractive" />

      <ErrorProvider>
        <TokenProvider>
          <ChainProvider>
            <Web3Provider>
              <WalletModalContext.Provider value={{ isOpen, setIsOpen }}>
                <Component {...pageProps} />
              </WalletModalContext.Provider>
              <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
            </Web3Provider>
          </ChainProvider>
        </TokenProvider>
      </ErrorProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};

export default App;
