import { Main, Header, Body, Footer } from 'components/layout';
import Web3Provider from 'contexts/web3';

function Home() {
  return (
    <Web3Provider>
      <Main>
        <Header />
        <Body />
        <Footer />
      </Main>
    </Web3Provider>
  );
}

export default Home;
