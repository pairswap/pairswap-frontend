import 'styles/global.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import shallow from 'zustand/shallow';

import ErrorModal from 'components/modal/error';
import SuccessModal from 'components/modal/success';
import useWeb3 from 'hooks/useWeb3';
import useError from 'hooks/useError';

function App({ Component, pageProps }) {
  const setError = useError((state) => state.setError);
  const { available, addListerner } = useWeb3(
    (state) => ({
      available: state.available,
      addListerner: state.addListerner,
    }),
    shallow
  );

  useEffect(() => {
    if (available) {
      addListerner();
    } else {
      setError(new Error('No metamask installed'));
    }
  }, [available, addListerner, setError]);

  return (
    <>
      <Head>
        <title>Pairswap</title>
      </Head>

      <Component {...pageProps} />
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
