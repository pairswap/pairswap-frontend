import { useState } from 'react';
import TokenModal from 'components/modal/token';
import data from 'data';

const tokens = data[0].tokens;
const userAmount = 10;
const totalAmount = 1000;

function Body() {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

  return (
    <main className="flex-1">
      <div className="max-w-lg mx-auto mt-8 md:mt-24 px-4">
        <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-3xl mt-2 bg-white dark:bg-gray-900 shadow-sm">
          <h4 className="text-xl text-center font-bold my-4">Add Liquidity</h4>
          <div className="border border-gray-100 dark:border-gray-800 rounded-3xl p-4">
            <label className="mx-2 dark:text-gray-300">Input</label>
            <div className="grid grid-cols-2">
              <input
                type="number"
                min="0"
                max="10000"
                step="0.0001"
                placeholder="0"
                className="text-xl dark:bg-gray-900 text-gray-400 outline-none m-2"
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
            <div className="grid grid-cols-3 text-center border border-gray-100 dark:border-gray-800 rounded-3xl p-4">
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
            <button className="text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl w-full py-4 mt-12">
              Supply
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Body;
