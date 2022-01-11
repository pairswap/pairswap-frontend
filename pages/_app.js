import 'styles/global.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pairswap</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};

export default App;
