import 'styles/global.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

import NotificationProvider from 'contexts/notification';
import Web3Provider from 'contexts/web3';
import ChainProvider from 'contexts/chain';
import TokenProvider from 'contexts/token';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pairswap</title>
      </Head>

      <Web3Provider>
        <NotificationProvider>
          <ChainProvider>
            <TokenProvider>
              <Component {...pageProps} />
            </TokenProvider>
          </ChainProvider>
        </NotificationProvider>
      </Web3Provider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};

export default App;
