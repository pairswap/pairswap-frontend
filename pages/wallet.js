import dynamic from 'next/dynamic';

import Header from 'components/header';

const Main = dynamic(() => import('components/main/wallet'), { ssr: false });

function Wallet() {
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
}

export default Wallet;
