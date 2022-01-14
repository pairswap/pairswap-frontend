import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { XIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

import Modal from 'components/modal';
import useSearching from 'utils/useSearching';

const conditions = {
  keys: ['chainName', 'chainId'],
  exact: ['chainId'],
};

function ChainModal({ chains, selectedChain, setSelectedChain }) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const filteredChains = useSearching(chains, keyword, conditions);

  function handleClose() {
    setIsOpen(false);
    setKeyword('');
  }

  function handleSelect(chain) {
    setSelectedChain(chain);
    handleClose();
  }

  if (!selectedChain) {
    return (
      <div className="flex justify-center items-center flex-1 bg-gray-300 border rounded-xl px-4 py-4 m-2">
        <div className="animate-spin rounded-full w-8 h-8 border-4 border-b-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="flex justify-between items-center flex-1 bg-gray-300 hover:bg-gray-200 border rounded-xl px-4 py-2 m-2"
      >
        <Image
          src={selectedChain.chainLogoURL}
          alt={selectedChain.chainName}
          width={30}
          height={30}
          unoptimized
          className="rounded-full"
        />
        <span className="mx-2 h-12 flex justify-center items-center">
          {selectedChain.chainName}
        </span>
        <ChevronDownIcon className="w-4 h-4 ml-1" />
      </button>

      <Modal open={isOpen} onClose={handleClose}>
        <div className="flex flex-col dark:text-gray-200">
          <div className="flex flex-col border-b">
            <div className="flex justify-between items-center font-bold mx-4 mt-4">
              <p>Select a network</p>
              <button onClick={handleClose}>
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <input
              placeholder="Search name or paste ID"
              className="border rounded-lg h-12 mx-4 mt-4 px-4 focus:outline-none focus:border-indigo-700 dark:focus:border-gray-900 dark:text-gray-900"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex justify-between mx-4 pt-8 pb-4">
              <span className="font-bold text-sm">Network name</span>
            </div>
          </div>
          <div className="flex flex-col h-[450px] overflow-auto">
            {filteredChains.length > 0 ? (
              filteredChains.map((chain, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(chain)}
                  className={clsx(
                    chain.chainId === selectedChain.chainId && 'bg-gray-100 dark:bg-gray-800',
                    'flex items-center p-4 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  <Image
                    src={chain.chainLogoURL}
                    alt={chain.chainName}
                    width={40}
                    height={40}
                    unoptimized
                  />
                  <span className="mx-4">{chain.chainName}</span>
                </button>
              ))
            ) : (
              <p className="text-center text-gray-400 mt-32">No networks found</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

ChainModal.propTypes = {
  chains: PropTypes.arrayOf(PropTypes.shape({})),
  selectedChain: PropTypes.shape({
    chainName: PropTypes.string,
    chainLogoURL: PropTypes.string,
    chainId: PropTypes.number,
  }),
  setSelectedChain: PropTypes.func,
};

ChainModal.defaultProps = {
  chains: [],
};

export default ChainModal;
