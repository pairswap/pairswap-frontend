import DotsIcon from '../icons/dots';
import FlagIcon from '../icons/flag';
import CogIcon from '../icons/cog';
import WalletModal from '../modal/walletModal';

function Footer() {
  return (
    <div className="flex justify-between items-center sticky bottom-0 lg:hidden bg-white rounded-t-lg p-4">
      <WalletModal>
        {({ onClose }) => (
          <button
            onClick={onClose}
            className="font-bold rounded-2xl px-4 md:px-6 py-2 mx-1 border text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Connect to a wallet
          </button>
        )}
      </WalletModal>
      <div className="flex">
        <button className="rounded-xl border p-2 mx-1">
          <CogIcon />
        </button>
        <button className="rounded-xl border p-2 mx-1">
          <FlagIcon />
        </button>
        <button className="rounded-xl border p-2 mx-1">
          <DotsIcon />
        </button>
      </div>
    </div>
  );
}

export default Footer;
