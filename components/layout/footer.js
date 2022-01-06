import { useState } from 'react';
import WalletModal from 'components/modal/wallet';
import { useWallet } from 'contexts/wallet';

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, shortenAccount } = useWallet();

  return (
    <div className="flex justify-between items-center sticky bottom-0 sm:hidden bg-white dark:bg-gray-900 rounded-t-lg p-4">
      <button
        onClick={() => !isConnected && setIsOpen(true)}
        className="w-full font-bold rounded-2xl px-4 md:px-6 py-2 mx-1 text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {isConnected ? shortenAccount : 'Connect to a wallet'}
      </button>
      <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default Footer;
