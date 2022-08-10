import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import classname from 'utils/classname';

const WalletButton = dynamic(() => import('./wallet-button'), { ssr: false });

const routes = [
  { href: '/', title: 'Swap' },
  // { href: '/wallet', title: 'Wallet' },
  { href: '/support', title: 'Support' },
];

function Header() {
  const { pathname } = useRouter();

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
          <a
            href="http://159.223.84.201:4000"
            rel="noreferrer"
            target="_blank"
            className="nav__link"
          >
            Faucet
          </a>
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
