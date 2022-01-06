import { useState } from 'react';
import Link from 'next/link';
import WalletModal from 'components/modal/wallet';
import { useWallet } from 'contexts/wallet';
import Logo from 'svgs/logo.svg';

const chains = {
  1: 'ETH mainnet',
  56: 'BSC mainnet',
};

const unit = {
  1: 'ETH',
  56: 'BNB',
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, chainId, shortenAccount, shortenBalance } = useWallet();

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
        {isConnected ? (
          <>
            <div className="w-48 h-10 bg-gray-300 rounded-2xl flex justify-center items-center">
              {chains[chainId] ?? 'Wrong network'}
            </div>
            <div className="relative h-10 -right-7 border border-indigo-600 rounded-2xl px-8 py-2">
              {shortenBalance} {unit[chainId]}
            </div>
          </>
        ) : null}
        <button
          onClick={() => !isConnected && setIsOpen(true)}
          className="relative w-48 h-10 font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {isConnected ? shortenAccount : 'Connect to a wallet'}
        </button>
        <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </nav>
  );
}

export default Header;
