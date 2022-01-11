import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { XIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

import Modal from 'components/modal';

function TokenModal({ tokens, selectedToken, setSelectedToken }) {
  const [isOpen, setIsOpen] = useState(false);

  function selectToken(token) {
    setSelectedToken(token);
    setIsOpen(false);
  }

  if (!tokens || !selectedToken) {
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
        className="flex justify-center items-center flex-1 bg-gray-300 hover:bg-gray-200 border rounded-xl px-4 py-2 m-2"
      >
        <Image
          src={selectedToken.logoURL}
          alt={selectedToken.symbol}
          width={30}
          height={30}
          unoptimized
          className="rounded-full"
        />
        <span className="mx-2 h-12 flex justify-center items-center">
          {selectedToken.symbol} <ChevronDownIcon className="w-4 h-4 ml-1" />
        </span>
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col dark:text-gray-200">
          <div className="flex flex-col border-b">
            <div className="flex justify-between items-center font-bold mx-4 mt-4">
              <p>Select a token</p>
              <button onClick={() => setIsOpen(false)}>
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <input
              placeholder="Search name or paste address"
              className="border rounded-lg h-12 mx-4 mt-4 px-4 focus:outline-none focus:border-indigo-700 dark:focus:border-gray-900 dark:text-gray-900"
              onChange={(e) => console.log(e.target.value)}
            />
            <div className="flex justify-between mx-4 pt-8 pb-4">
              <span className="font-bold text-sm">Token name</span>
            </div>
          </div>
          <div className="flex flex-col max-h-[450px] overflow-auto">
            {tokens.map((token, index) => (
              <button
                key={index}
                onClick={() => selectToken(token)}
                className={clsx(
                  token.symbol === selectedToken.symbol && 'bg-gray-100 dark:bg-gray-800',
                  'flex items-center p-4 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                <Image src={token.logoURL} alt={token.symbol} width={40} height={40} unoptimized />
                <span className="mx-4">{token.symbol}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

TokenModal.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.shape({})),
  selectedToken: PropTypes.shape({
    symbol: PropTypes.string,
    logoURL: PropTypes.string,
  }),
  setSelectedToken: PropTypes.func,
};

export default TokenModal;
