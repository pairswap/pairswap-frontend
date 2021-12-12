import Head from 'next/head';
import { Main, Header, Body, Footer } from '../components/layout';

function Home() {
  return (
    <>
      <Head>
        <title>Pairswap</title>
      </Head>

      <Main>
        <Header />
        <Body />
        <Footer />
      </Main>
    </>
  );
}

export default Home;
