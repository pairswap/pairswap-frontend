import { useState } from 'react';

import WalletModal from 'components/modal/wallet';
import useWeb3 from 'utils/useWeb3';

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const { active, shortenAccount } = useWeb3();

  return (
    <div className="sticky bottom-0 flex items-center justify-between rounded-t-lg bg-white p-4 sm:hidden">
      <button
        onClick={() => !active && setIsOpen(true)}
        className="mx-1 w-full rounded-2xl bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 md:px-6"
      >
        {active ? shortenAccount : 'Connect to a wallet'}
      </button>
      <WalletModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default Footer;
