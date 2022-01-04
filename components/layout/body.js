import { useState } from 'react';
import { ArrowDownIcon } from '@heroicons/react/solid';
import TokensModal from 'components/modal/tokens';
import WalletModal from 'components/modal/wallet';
import { useWallet } from 'contexts/wallet';

function Body() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useWallet();

  return (
    <main className="flex-1">
      <div className="max-w-[420px] mx-auto mt-8 md:mt-24 px-4">
        <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-3xl mt-2 bg-white dark:bg-gray-900 shadow-sm">
          <div className="border border-gray-100 dark:border-gray-800 rounded-3xl p-4">
            <label className="mx-2 dark:text-gray-300">From</label>
            <div className="flex items-center">
              <input
                className="flex-1 text-xl dark:bg-gray-900 text-gray-400 outline-none m-2"
                type="number"
                defaultValue="0"
                min="0"
                max="10000"
                step="0.0001"
              />
              <TokensModal />
            </div>
          </div>
          <div className="flex justify-center dark:text-white my-4">
            <ArrowDownIcon className="w-4 h-4" />
          </div>
          <div className="border border-gray-100 dark:border-gray-800 rounded-3xl p-4">
            <label className="mx-2 dark:text-gray-300">To</label>
            <div className="flex items-center">
              <input
                className="flex-1 text-xl dark:bg-gray-900 text-gray-400 outline-none m-2"
                type="number"
                defaultValue="0"
                min="0"
                max="10000"
                step="0.0001"
              />
              <TokensModal />
            </div>
          </div>
          <button
            onClick={() => (isConnected ? console.log('swap') : setIsOpen(true))}
            className="text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white w-full rounded-2xl px-2 py-4 mt-8"
          >
            {isConnected ? 'Swap' : 'Connect Wallet'}
          </button>
          <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </main>
  );
}

export default Body;
