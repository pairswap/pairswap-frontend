import { useState } from 'react';
import TokenModal from 'components/modal/token';
import chains from 'config/chains';

const tokens = chains[0].tokens;
const userAmount = 10;
const totalAmount = 1000;

function Body() {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

  return (
    <main className="flex-1">
      <div className="mx-auto mt-8 max-w-lg px-4 md:mt-24">
        <div className="mt-2 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
          <h4 className="my-4 text-center text-xl font-bold">Add Liquidity</h4>
          <div className="rounded-3xl border border-gray-100 p-4">
            <label className="mx-2">Input</label>
            <div className="grid grid-cols-2">
              <input
                type="number"
                min="0"
                max="10000"
                step="0.0001"
                placeholder="0"
                className="m-2 text-xl text-gray-400 outline-none"
              />
              <TokenModal
                tokens={tokens}
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
              />
            </div>
          </div>

          <div>
            <p className="mt-8 mb-4">Prices and pool share</p>
            <div className="grid grid-cols-3 rounded-3xl border border-gray-100 p-4 text-center">
              <div>
                <p>Your amount</p>
                <p className="text-xl font-bold">{userAmount}</p>
              </div>
              <div>
                <p>Total amount</p>
                <p className="text-xl font-bold">{totalAmount}</p>
              </div>
              <div>
                <p>Share of Pool</p>
                <p className="text-xl font-bold">{(userAmount / totalAmount) * 100}%</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="mt-12 w-full rounded-2xl bg-indigo-600 py-4 text-sm text-white hover:bg-indigo-700 sm:text-base">
              Supply
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Body;
