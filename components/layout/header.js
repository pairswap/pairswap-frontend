import { useState } from 'react';
import Link from 'next/link';
import WalletModal from 'components/modal/wallet';
import { useWallet } from 'contexts/wallet';
import Logo from 'svgs/logo.svg';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, shortenAccount } = useWallet();

  return (
    <nav className="flex items-center justify-between border-b border-gray-300 dark:border-black shadow-sm px-2 md:px-8 py-4 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <Logo className="inline" />
        <Link href="/">
          <a className="text-base font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mx-1 md:mx-2">
            <span className="text-black dark:text-white">Swap</span>
          </a>
        </Link>
      </div>
      <div className="hidden sm:flex sm:items-center">
        <button
          onClick={() => !isConnected && setIsOpen(true)}
          className="font-bold rounded-2xl px-6 py-2 mx-2 text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {isConnected ? shortenAccount : 'Connect to a wallet'}
        </button>
        <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </nav>
  );
}

export default Header;
