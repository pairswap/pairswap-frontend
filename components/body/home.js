import { useState } from 'react';
import { ArrowDownIcon } from '@heroicons/react/solid';

import ChainModal from 'components/modal/chain';
import TokenModal from 'components/modal/token';
import WalletModal from 'components/modal/wallet';
import data from 'data';
import useChain from 'utils/useChain';
import useToken from 'utils/useToken';
import useWeb3 from 'utils/useWeb3';
import useSwap from 'utils/useSwap';

function Body() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const { active } = useWeb3();
  const { transfer } = useSwap();
  const {
    sourceChains,
    selectedSourceChain,
    setSelectedSourceChain,
    destChains,
    selectedDestChain,
    setSelectedDestChain,
  } = useChain(data);
  const { sourceToken, setSourceToken, destToken, setDestToken } = useToken({
    sourceChain: selectedSourceChain,
    destChain: selectedDestChain,
  });

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-3xl mt-2 bg-white dark:bg-gray-900 shadow-sm">
          <div className="border border-gray-100 dark:border-gray-800 rounded-3xl p-4">
            <label className="mx-2 dark:text-gray-300">From</label>
            <div className="grid grid-cols-2 md:grid-cols-4">
              <input
                type="number"
                min="0"
                max="10000"
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-2 text-xl dark:bg-gray-900 text-gray-400 outline-none m-2"
              />
              <TokenModal
                tokens={selectedSourceChain?.tokens}
                selectedToken={sourceToken}
                setSelectedToken={setSourceToken}
              />
              <ChainModal
                chains={sourceChains}
                selectedChain={selectedSourceChain}
                setSelectedChain={setSelectedSourceChain}
              />
            </div>
          </div>

          <div className="flex justify-center dark:text-white my-4">
            <ArrowDownIcon className="w-4 h-4" />
          </div>

          <div className="border border-gray-100 dark:border-gray-800 rounded-3xl p-4">
            <label className="mx-2 dark:text-gray-300">To</label>
            <div className="grid grid-cols-2 md:grid-cols-4">
              <input
                readOnly
                value={amount}
                className="col-span-2 text-xl dark:bg-gray-900 text-gray-400 outline-none m-2"
              />
              <TokenModal
                tokens={selectedDestChain?.tokens}
                selectedToken={destToken}
                setSelectedToken={setDestToken}
              />
              <ChainModal
                chains={destChains}
                selectedChain={selectedDestChain}
                setSelectedChain={setSelectedDestChain}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => (active ? transfer({ amount }) : setIsOpen(true))}
              className="text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl w-full md:w-80 py-4 mt-12"
            >
              {active ? 'Swap' : 'Connect Wallet'}
            </button>
          </div>
          <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </main>
  );
}

export default Body;
