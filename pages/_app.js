import 'styles/global.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Script from 'next/script';

import ChainProvider from 'contexts/chain';
import ErrorProvider from 'contexts/error';
import Web3Provider from 'contexts/web3';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>KO Exchange</title>
      </Head>
      <Script type="text/javascript" src="config.js" strategy="beforeInteractive" />

      <ErrorProvider>
        <ChainProvider>
          <Web3Provider>
            <Component {...pageProps} />
          </Web3Provider>
        </ChainProvider>
      </ErrorProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};

export default App;
