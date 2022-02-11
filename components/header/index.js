import { useState } from 'react';
import Link from 'next/link';

import WalletModal from 'components/modal/wallet';
import Logo from 'svgs/logo.svg';
import useWeb3 from 'utils/useWeb3';
import { useChain } from 'utils/useChain';

function Header() {
  const { selectedSourceChain } = useChain();
  const [isOpen, setIsOpen] = useState(false);
  const { shortenAccount, active, balance } = useWeb3();

  return (
    <nav className="flex items-center justify-between border-b border-gray-300 bg-white px-2 py-4 shadow-sm md:px-8">
      <div className="flex items-center space-x-8">
        <Logo className="inline" />
        <Link href="/">
          <a className="text-base font-bold text-gray-600 hover:text-black">
            <span className="text-black">Swap</span>
          </a>
        </Link>
      </div>

      <div className="hidden sm:flex sm:items-center">
        {active ? (
          <>
            <div className="flex h-10 w-52 items-center justify-center rounded-2xl bg-gray-300">
              {selectedSourceChain?.chainName}
            </div>
            <div className="relative -right-7 flex h-10 w-44 items-center justify-center rounded-2xl border border-indigo-600 px-8">
              {balance ? (
                <span>
                  {balance} {selectedSourceChain?.nativeCurrency?.symbol}
                </span>
              ) : (
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-b-indigo-600"></div>
              )}
            </div>
          </>
        ) : null}

        <button
          onClick={() => !active && setIsOpen(true)}
          className="relative h-10 w-48 rounded-2xl bg-indigo-600 font-bold text-white hover:bg-indigo-700"
        >
          {active ? shortenAccount : 'Connect to a wallet'}
        </button>

        <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </nav>
  );
}

export default Header;
