import { useState } from 'react';
import { ArrowDownIcon } from '@heroicons/react/solid';

import ChainModal from 'components/modal/chain';
import TokenModal from 'components/modal/token';
import WalletModal from 'components/modal/wallet';
import { useChain, useUpdateChain } from 'utils/useChain';
import { useToken, useUpdateToken } from 'utils/useToken';
import useWeb3 from 'utils/useWeb3';
import useSwap from 'utils/useSwap';

function Body() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const { account, active } = useWeb3();
  const { transfer } = useSwap();
  const { sourceChains, selectedSourceChain, destChains, selectedDestChain } = useChain();
  const { setSelectedSourceChain, setSelectedDestChain } = useUpdateChain();
  const { selectedSourceToken, selectedDestToken } = useToken();
  const { setSelectedSourceToken, setSelectedDestToken } = useUpdateToken();

  return (
    <main className="flex-1">
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <div className="mt-2 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="rounded-3xl border border-gray-100 p-4">
            <label className="mx-2">From</label>
            <div className="grid grid-cols-2 md:grid-cols-4">
              <input
                type="number"
                min="0"
                max="10000"
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-2 m-2 text-xl text-gray-400 outline-none"
              />
              <TokenModal
                tokens={selectedSourceChain?.tokens}
                selectedToken={selectedSourceToken}
                setSelectedToken={setSelectedSourceToken}
              />
              <ChainModal
                chains={sourceChains}
                selectedChain={selectedSourceChain}
                setSelectedChain={setSelectedSourceChain}
              />
            </div>
          </div>

          <div className="my-4 flex justify-center">
            <ArrowDownIcon className="h-4 w-4" />
          </div>

          <div className="rounded-3xl border border-gray-100 p-4">
            <label className="mx-2">To</label>
            <div className="grid grid-cols-2 md:grid-cols-4">
              <input
                readOnly
                value={amount}
                className="col-span-2 m-2 text-xl text-gray-400 outline-none"
              />
              <TokenModal
                tokens={selectedDestChain?.tokens}
                selectedToken={selectedDestToken}
                setSelectedToken={setSelectedDestToken}
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
              onClick={() =>
                active
                  ? transfer({
                      contractAddress: selectedSourceChain.gatewayAddress,
                      destChain: selectedDestChain.transferName,
                      recipient: account,
                      tokenOut: selectedSourceToken.address,
                      tokenIn: selectedDestToken.address,
                      amount,
                    })
                  : setIsOpen(true)
              }
              className="mt-12 w-full rounded-2xl bg-indigo-600 py-4 text-sm text-white hover:bg-indigo-700 sm:text-base md:w-80"
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
