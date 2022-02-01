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
      <div className="m-2 flex flex-1 items-center justify-center rounded-xl border bg-gray-300 px-4 py-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-b-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="m-2 flex flex-1 items-center justify-between rounded-xl border bg-gray-300 px-4 py-2 hover:bg-gray-200"
      >
        <Image
          src={selectedChain.chainLogoURL}
          alt={selectedChain.chainName}
          width={30}
          height={30}
          unoptimized
          className="rounded-full"
        />
        <span className="mx-2 flex h-12 items-center justify-center">
          {selectedChain.chainName}
        </span>
        <ChevronDownIcon className="ml-1 h-4 w-4" />
      </button>

      <Modal open={isOpen} onClose={handleClose}>
        <div className="flex flex-col">
          <div className="flex flex-col border-b">
            <div className="mx-4 mt-4 flex items-center justify-between font-bold">
              <p>Select a network</p>
              <button onClick={handleClose}>
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <input
              placeholder="Search name or paste ID"
              className="mx-4 mt-4 h-12 rounded-lg border px-4 focus:border-indigo-700 focus:outline-none"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="mx-4 flex justify-between pt-8 pb-4">
              <span className="text-sm font-bold">Network name</span>
            </div>
          </div>
          <div className="flex h-[450px] flex-col overflow-auto">
            {filteredChains.length > 0 ? (
              filteredChains.map((chain, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(chain)}
                  className={clsx(
                    chain.chainId === selectedChain.chainId && 'bg-gray-100',
                    'flex items-center p-4 hover:bg-gray-200'
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
              <p className="mt-32 text-center text-gray-400">No networks found</p>
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
