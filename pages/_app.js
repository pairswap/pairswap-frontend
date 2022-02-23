import 'styles/global.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

import ErrorModal from 'components/modal/error';
import SuccessModal from 'components/modal/success';
import Web3Provider from 'contexts/web3';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pairswap</title>
      </Head>

      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
      <ErrorModal />
      <SuccessModal />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};

export default App;
