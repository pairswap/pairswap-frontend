import dynamic from 'next/dynamic';

import Main from 'components/main/home';

const Header = dynamic(() => import('components/header'), { ssr: false });

function Home() {
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
}

export default Home;
