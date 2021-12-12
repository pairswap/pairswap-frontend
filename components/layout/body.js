import ArrowDownIcon from '../icons/arrow';
import TokenModal from '../modal/tokenModal';
import WalletModal from '../modal/walletModal';

function Body() {
  return (
    <main className="flex-1">
      <div className="max-w-[420px] mx-auto mt-8 md:mt-24 px-4">
        <div className="border border-gray-100 p-4 rounded-3xl mt-2 bg-white shadow-sm">
          <div className="border border-gray-100 rounded-3xl p-4">
            <label className="mx-2">From</label>
            <div className="flex items-center">
              <input
                className="flex-1 text-xl text-gray-400 outline-none m-2"
                type="number"
                defaultValue="0"
                min="0"
                max="10"
                step="0.001"
              />
              <TokenModal />
            </div>
          </div>
          <div className="flex justify-center my-4">
            <ArrowDownIcon />
          </div>
          <div className="border border-gray-100 rounded-3xl p-4">
            <label className="mx-2">To</label>
            <div className="flex items-center">
              <input
                className="flex-1 text-xl text-gray-400 outline-none m-2"
                type="number"
                defaultValue="0"
                min="0"
                max="10"
                step="0.001"
              />
              <TokenModal />
            </div>
          </div>
          <WalletModal>
            {({ onClose }) => (
              <button
                onClick={onClose}
                className="text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white border  w-full rounded-2xl px-2 py-4 mt-8"
              >
                Connect Wallet
              </button>
            )}
          </WalletModal>
        </div>
      </div>
    </main>
  );
}

export default Body;
