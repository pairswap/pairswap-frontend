import Head from 'next/head';
import { Main, Header, Body } from '../components/layout';

function Home() {
  return (
    <>
      <Head>
        <title>Pairswap</title>
      </Head>

      <Main>
        <Header />
        <Body />
      </Main>
    </>
  );
}

export default Home;
