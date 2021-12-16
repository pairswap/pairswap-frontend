import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import MetaMaskOnboarding from '@metamask/onboarding';
import Modal from '.';
import CloseIcon from '../icons/close';
import { shortenAddress } from '../../utils/string';

function WalletModal({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [displayText, setDisplayText] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setDisplayText(shortenAddress(accounts[0]));
        onboarding.current.stopOnboarding();
      }
    }
  }, [accounts]);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', (newAccounts) => setAccounts(newAccounts));

      return () => {
        window.ethereum.removeListener('accountsChanged', (newAccounts) =>
          setAccounts(newAccounts)
        );
      };
    }
  }, []);

  function connectWallet() {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
    setIsOpen(false);
  }

  function onClick() {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && accounts.length > 0) {
      return;
    }
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <div>
      {children({ displayText, onClick })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col dark:text-gray-200">
          <div className="flex justify-between items-center font-bold border-b dark:border-gray-800 p-4 mb-4">
            <p>Connect to a wallet</p>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <button
            onClick={connectWallet}
            className="flex justify-between bg-gray-100 hover:bg-gray-200 dark:bg-gray-300 dark:hover:bg-white rounded-lg p-4 m-4"
          >
            <p className="font-bold dark:text-black">Metamask</p>
            <Image src="/images/metamask.png" alt="metamask" width="24" height="24" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default WalletModal;
