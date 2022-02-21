import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import SelectWalletModal from 'components/modal/select-wallet';
import classname from 'utils/classname';
import { shortenAccount, shortenBalance } from 'utils/transform';
import { useChain } from 'utils/useChain';
import { useWeb3 } from 'utils/useWeb3';

const routes = [
  { href: '/', title: 'Swap' },
  { href: '/pool', title: 'Pool' },
  { href: '/stake', title: 'Stake' },
];

function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedSourceChain } = useChain();
  const { account, active, balance } = useWeb3();

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
              <a className={classname('nav__link', router.asPath === href && 'nav__link--active')}>
                {title}
              </a>
            </Link>
          ))}
        </nav>

        <div className="header__item">
          {active ? (
            <div className="profile">
              <div className="balance">
                {shortenBalance(balance)} {selectedSourceChain?.nativeCurrency?.symbol}
              </div>
              <div className="profile__divider" />
              <div className="account">{shortenAccount(account)}</div>
            </div>
          ) : (
            <button onClick={() => !active && setIsOpen(true)} className="btn-connect">
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
