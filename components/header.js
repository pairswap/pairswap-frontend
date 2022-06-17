import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Dropdown from 'components/dropdown';
import SelectWalletModal from 'components/modal/select-wallet';
import classname from 'utils/classname';
import { shortenAccount, shortenBalance } from 'utils/transform';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';

const routes = [
  { href: '/', title: 'Swap' },
  { href: '/wallet', title: 'Wallet' },
  { href: '/support', title: 'Support' },
];

function Header() {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { srcChain } = useChain();
  const { account, balance, connected } = useWeb3();
  const nativeTokenSymbol = srcChain?.nativeCurrency?.symbol;

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
            rel="noreferrer"
            target="_blank"
            href="https://faucet.ko.exchange"
            className="nav__link"
          >
            Faucet
          </a>
        </nav>

        <div className="header__item">
          {connected ? (
            <div className="account">
              <div className="account-detail">
                <div className="account-balance">
                  {balance ? (
                    `${shortenBalance(balance)} ${nativeTokenSymbol}`
                  ) : (
                    <div className="spiner" />
                  )}
                </div>
                <div className="account-detail__provider" />
                <div className="account-address">{shortenAccount(account)}</div>
              </div>
              <Dropdown />
            </div>
          ) : (
            <button onClick={() => setIsOpen(true)} className="btn-connect">
              Connect Wallet
            </button>
          )}
        </div>
      </header>
      <div className="divider" />
      <SelectWalletModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default Header;
