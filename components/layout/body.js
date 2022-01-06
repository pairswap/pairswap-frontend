import { useState } from 'react';
import { ArrowDownIcon } from '@heroicons/react/solid';
import TokensModal from 'components/modal/token';
import WalletModal from 'components/modal/wallet';
import Select from 'components/select';
import { useWallet } from 'contexts/wallet';
import data from 'data';

function Body() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useWallet();

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto mt-8 md:mt-24 px-4">
        <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-3xl mt-2 bg-white dark:bg-gray-900 shadow-sm">
          <div className="border border-gray-100 dark:border-gray-800 rounded-3xl p-4">
            <label className="mx-2 dark:text-gray-300">From</label>
            <div className="grid grid-cols-2 md:grid-cols-4">
              <input
                className="col-span-2 text-xl dark:bg-gray-900 text-gray-400 outline-none m-2"
                type="number"
                defaultValue="0"
                min="0"
                max="10000"
                step="0.0001"
              />
              <Select data={data} />
            </div>
          </div>

          <div className="flex justify-center dark:text-white my-4">
            <ArrowDownIcon className="w-4 h-4" />
          </div>

          <div className="border border-gray-100 dark:border-gray-800 rounded-3xl p-4">
            <label className="mx-2 dark:text-gray-300">To</label>
            <div className="grid grid-cols-2 md:grid-cols-4">
              <input
                className="col-span-2 text-xl dark:bg-gray-900 text-gray-400 outline-none m-2"
                type="number"
                defaultValue="0"
                min="0"
                max="10000"
                step="0.0001"
              />
              <Select data={data} />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => (isConnected ? console.log('Swap') : setIsOpen(true))}
              className="text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl w-full md:w-80 py-4 mt-12"
            >
              {isConnected ? 'Swap' : 'Connect Wallet'}
            </button>
          </div>
          <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </main>
  );
}

export default Body;
