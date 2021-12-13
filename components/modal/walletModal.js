import { useState } from 'react';
import Image from 'next/image';
import Modal from '.';
import CloseIcon from '../icons/close';

function WalletModal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {children({ onClose: () => setIsOpen(true) })}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col dark:text-gray-200">
          <div className="flex justify-between items-center font-bold border-b dark:border-gray-800 p-4 mb-4">
            <p>Connect to a wallet</p>
            <button onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <button className="flex justify-between bg-gray-100 hover:bg-gray-200 dark:bg-gray-300 hover:dark:bg-white rounded-lg p-4 m-4">
            <p className="font-bold dark:text-black">Metamask</p>
            <Image src="/images/metamask.png" alt="metamask" width="24" height="24" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default WalletModal;
