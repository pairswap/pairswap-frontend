import Head from 'next/head';
import { Main, Header, Body, Footer } from 'components/layout';
import { WalletProvier } from 'contexts/wallet';

function Home() {
  return (
    <>
      <Head>
        <title>Pairswap</title>
      </Head>

      <WalletProvier>
        <Main>
          <Header />
          <Body />
          <Footer />
        </Main>
      </WalletProvier>
    </>
  );
}

export default Home;
