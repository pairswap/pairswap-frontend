import { useEffect, useState, useCallback } from 'react';
import { ArrowDownIcon } from '@heroicons/react/solid';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import SampleERC20 from 'abis/SampleERC20.json';
import ChainModal from 'components/modal/chain';
import TokenModal from 'components/modal/token';
import WalletModal from 'components/modal/wallet';
import { convertBigNumberToString } from 'utils/transform';
import { useChain, useUpdateChain } from 'utils/useChain';
import { useToken, useUpdateToken } from 'utils/useToken';
import { useWeb3 } from 'utils/useWeb3';
import useSwap from 'utils/useSwap';
import { shortenBalance } from 'utils/transform';

function Body() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState();
  const { account, active } = useWeb3();
  const { transfer } = useSwap();
  const { sourceChains, selectedSourceChain, destChains, selectedDestChain } = useChain();
  const { setSelectedSourceChain, setSelectedDestChain } = useUpdateChain();
  const { selectedSourceToken, selectedDestToken } = useToken();
  const { setSelectedSourceToken, setSelectedDestToken } = useUpdateToken();

  const getTokenBalance = useCallback(async () => {
    if (account && selectedSourceToken) {
      try {
        const provider = new Web3Provider(window.ethereum);
        const contract = new Contract(selectedSourceToken.address, SampleERC20.abi, provider);
        const balance = await contract.balanceOf(account);
        setTokenBalance(convertBigNumberToString(balance));
      } catch (error) {}
    }
  }, [account, selectedSourceToken]);

  useEffect(() => {
    getTokenBalance();
  }, [getTokenBalance]);

  return (
    <main className="flex-1">
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <div className="mt-2 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="rounded-3xl border border-gray-100 p-4">
            <div className="mr-2 flex justify-between">
              <label className="mx-2">From</label>
              {active && tokenBalance ? <span>Balance: {shortenBalance(tokenBalance)}</span> : null}
            </div>
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
