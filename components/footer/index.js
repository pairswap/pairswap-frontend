import { useState } from 'react';

import WalletModal from 'components/modal/wallet';
import useWeb3 from 'utils/useWeb3';

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const { active, shortenAccount } = useWeb3();

  return (
    <div className="flex justify-between items-center sticky bottom-0 sm:hidden bg-white rounded-t-lg p-4">
      <button
        onClick={() => !active && setIsOpen(true)}
        className="w-full font-bold rounded-2xl px-4 md:px-6 py-2 mx-1 text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {active ? shortenAccount : 'Connect to a wallet'}
      </button>
      <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default Footer;
