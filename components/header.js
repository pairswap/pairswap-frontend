import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import SelectWalletModal from 'components/modal/select-wallet';
import classname from 'utils/classname';
import { shortenAccount, shortenBalance } from 'utils/transform';
import useChain from 'hooks/useChain';
import useError from 'hooks/useError';
import useWeb3 from 'hooks/useWeb3';

const routes = [
  { href: '/', title: 'Swap' },
  { href: '/wallet', title: 'Wallet' },
  // { href: '/pool', title: 'Pool' },
  // { href: '/stake', title: 'Stake' },
  { href: '/support', title: 'Support' },
];

function Header() {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { srcChain } = useChain();
  const setError = useError();
  const { available, account, balance, connected } = useWeb3();

  const handleConnect = useCallback(() => {
    if (!connected) {
      if (available) {
        setIsOpen(true);
      } else {
        setError(new Error('No metamask installed'));
      }
    }
  }, [available, connected, setError]);

  return (
    <>
      <header className="header">
        <Link href="/">
          <a className="header__item">
            <img src="/images/logo.svg" alt="logo" className="logo" />
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
        </nav>

        <div className="header__item">
          {connected ? (
            <div className="profile">
              <div className="balance">
                {balance ? (
                  `${shortenBalance(balance)} ${srcChain?.nativeCurrency?.symbol}`
                ) : (
                  <div className="spiner" />
                )}
              </div>
              <div className="profile__divider" />
              <div className="account">{shortenAccount(account)}</div>
            </div>
          ) : (
            <button onClick={handleConnect} className="btn-connect">
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
