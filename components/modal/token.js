import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { XIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

import Modal from 'components/modal';
import useSearching from 'utils/useSearching';

const conditions = {
  keys: ['name', 'address'],
  exact: ['address'],
};

function TokenModal({ tokens, selectedToken, setSelectedToken }) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const filteredTokens = useSearching(tokens, keyword, conditions);

  function handleClose() {
    setIsOpen(false);
    setKeyword('');
  }

  function handleSelect(token) {
    setSelectedToken(token);
    handleClose();
  }

  if (!selectedToken) {
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
        className="m-2 flex flex-1 items-center justify-between gap-x-2 rounded-xl border bg-gray-300 p-2 hover:bg-gray-200"
      >
        <div className="flex items-center justify-center rounded-full border bg-white p-2">
          <Image
            src={selectedToken.iconSrc}
            alt={selectedToken.symbol}
            width={30}
            height={30}
            unoptimized
            className="rounded-full"
          />
        </div>
        <span>{selectedToken.symbol}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      <Modal open={isOpen} onClose={handleClose}>
        <div className="flex flex-col">
          <div className="flex flex-col border-b">
            <div className="mx-4 mt-4 flex items-center justify-between font-bold">
              <p>Select a token</p>
              <button onClick={handleClose}>
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <input
              placeholder="Search name or paste address"
              className="mx-4 mt-4 h-12 rounded-lg border px-4 focus:border-indigo-700 focus:outline-none"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="mx-4 flex justify-between pt-8 pb-4">
              <span className="text-sm font-bold">Token name</span>
            </div>
          </div>
          <div className="flex h-[450px] flex-col overflow-auto">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(token)}
                  className={clsx(
                    token.symbol === selectedToken.symbol && 'bg-gray-100',
                    'flex items-center p-4 hover:bg-gray-200'
                  )}
                >
                  <div className="flex items-center justify-center rounded-full border bg-white p-2">
                    <Image
                      src={token.iconSrc}
                      alt={token.symbol}
                      width={40}
                      height={40}
                      unoptimized
                    />
                  </div>
                  <span className="mx-4">{token.symbol}</span>
                </button>
              ))
            ) : (
              <p className="mt-32 text-center text-gray-400">No tokens found</p>
            )}
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
    iconSrc: PropTypes.string,
  }),
  setSelectedToken: PropTypes.func,
};

TokenModal.defaultProps = {
  tokens: [],
};

export default TokenModal;
