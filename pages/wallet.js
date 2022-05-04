import dynamic from 'next/dynamic';

const Header = dynamic(() => import('components/header'), { ssr: false });
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
