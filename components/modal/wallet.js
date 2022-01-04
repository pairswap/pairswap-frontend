import Image from 'next/image';
import { XIcon } from '@heroicons/react/solid';
import Modal from 'components/modal';
import { useWallet } from 'contexts/wallet';

function WalletModal({ open, onClose }) {
  const { connect } = useWallet();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col dark:text-gray-200">
        <div className="flex justify-between items-center font-bold border-b dark:border-gray-800 p-4 mb-4">
          <p>Connect to a wallet</p>
          <button onClick={onClose}>
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => {
            connect();
            onClose();
          }}
          className="flex justify-between bg-gray-100 hover:bg-gray-200 dark:bg-gray-300 dark:hover:bg-white rounded-lg p-4 m-4"
        >
          <p className="font-bold dark:text-black">Metamask</p>
          <Image src="/images/metamask.png" alt="metamask" width="24" height="24" />
        </button>
      </div>
    </Modal>
  );
}

export default WalletModal;
