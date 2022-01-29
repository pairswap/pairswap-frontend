import 'styles/global.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

import ToastProvider from 'contexts/toast';
import Web3Provider from 'contexts/web3';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pairswap</title>
      </Head>

      <Web3Provider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </Web3Provider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};

export default App;
