import dynamic from 'next/dynamic';

import Main from 'components/main/pool';

const Header = dynamic(() => import('components/header'), { ssr: false });

function Stake() {
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
}

export default Stake;
