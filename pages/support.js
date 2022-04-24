import dynamic from 'next/dynamic';

import Main from 'components/main/support';

const Header = dynamic(() => import('components/header'), { ssr: false });

function Support() {
  return (
    <div className="container">
      <Header />
      <Main />
    </div>
  );
}

export default Support;
