import Link from 'next/link';
import clsx from 'clsx';
import Logo from '../icons/logo';
import DotsIcon from '../icons/dots';
import FlagIcon from '../icons/flag';
import CogIcon from '../icons/cog';
import WalletModal from '../modal/walletModal';

function NavItem({ children, href, className }) {
  return (
    <Link href={href}>
      <a
        className={clsx(
          className,
          'text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mx-1 md:mx-4'
        )}
      >
        {children}
      </a>
    </Link>
  );
}

function Header() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-300 dark:border-black shadow-sm px-2 md:px-8 py-4 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between w-full md:block md:w-max">
        <Logo className="inline" />
        <NavItem href="/">
          <span className="text-black dark:text-white">Swap</span>
        </NavItem>
        <NavItem href="/">Buy</NavItem>
        <NavItem href="/">Pool</NavItem>
        <NavItem href="/">Farm</NavItem>
        <NavItem href="/">Stake</NavItem>
        <NavItem href="/" className="hidden sm:inline">
          Bond<sup>↗</sup>
        </NavItem>
        <NavItem href="/" className="hidden sm:inline">
          Chart<sup>↗</sup>
        </NavItem>
      </div>
      <div className="hidden lg:flex lg:items-center">
        <WalletModal>
          {({ onClose }) => (
            <button
              onClick={onClose}
              className="font-bold rounded-2xl px-6 py-2 mx-2 text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Connect to a wallet
            </button>
          )}
        </WalletModal>
        <button className="dark:bg-gray-300 hover:bg-gray-200 dark:hover:bg-white rounded-xl border p-2 mx-2">
          <CogIcon />
        </button>
        <button className="dark:bg-gray-300 hover:bg-gray-200 dark:hover:bg-white rounded-xl border p-2 mx-2">
          <FlagIcon />
        </button>
        <button className="dark:bg-gray-300 hover:bg-gray-200 dark:hover:bg-white rounded-xl border p-2 mx-2">
          <DotsIcon />
        </button>
      </div>
    </nav>
  );
}

export default Header;
