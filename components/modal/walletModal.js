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
        <div className="flex flex-col">
          <div className="flex justify-between items-center font-bold border-b p-4 mb-4">
            <p>Connect to a wallet</p>
            <button onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <button className="flex justify-between border hover:border-indigo-600 rounded-lg p-4 m-4">
            <p className="font-bold">Metamask</p>
            <Image src="/images/metamask.png" alt="metamask" width="24" height="24" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default WalletModal;
