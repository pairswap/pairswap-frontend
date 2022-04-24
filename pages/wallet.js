import dynamic from 'next/dynamic';

import Main from 'components/main/wallet';

const Header = dynamic(() => import('components/header'), { ssr: false });

function Wallet() {
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
}

export default Wallet;
