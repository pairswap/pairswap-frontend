import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import classname from 'utils/classname';

const WalletButton = dynamic(() => import('./wallet-button'), { ssr: false });

const routes = [
  { href: '/', title: 'Swap' },
  { href: '/wallet', title: 'Wallet' },
  { href: '/support', title: 'Support' },
];

function Header() {
  const [faucetURL, setFaucetURL] = useState(null);
  const { pathname } = useRouter();

  useEffect(() => {
    if (window?.config?.faucetURL) {
      setFaucetURL(window.config.faucetURL);
    }
  }, []);

  return (
    <>
      <header className="header">
        <Link href="/">
          <a className="header__item">
            <figure className="logo">
              <img src="images/logo.svg" alt="logo" className="logo__img" />
              <figcaption className="logo__brand">KO EXCHANGE</figcaption>
            </figure>
          </a>
        </Link>

        <nav className="header__item nav">
          {routes.map(({ href, title }, index) => (
            <Link key={index} href={href}>
              <a className={classname('nav__link', pathname === href && 'nav__link--active')}>
                {title}
              </a>
            </Link>
          ))}
          {faucetURL ? (
            <a href={faucetURL} rel="noreferrer" target="_blank" className="nav__link">
              Faucet
            </a>
          ) : null}
        </nav>

        <div className="header__item">
          <WalletButton />
        </div>
      </header>
      <div className="divider" />
    </>
  );
}

export default Header;
