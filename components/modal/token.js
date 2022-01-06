import { useState, useEffect } from 'react';
import Image from 'next/image';
import { XIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import Modal from 'components/modal';

function TokenModal({ data: tokens, selectedIndex, setSelectedIndex }) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [previousKeyword, setPreviousKeyword] = useState('');

  useEffect(() => {
    if (keyword && keyword !== previousKeyword) {
      const filteredTokens = tokens.filter(({ symbol }) => {
        const name = symbol.toLowerCase();
        return name.includes(keyword);
      });

      setPreviousKeyword(keyword);
      setItems(filteredTokens);
    }
  }, [keyword, previousKeyword, tokens]);

  function reset() {
    setKeyword('');
    setPreviousKeyword('');
    setIsOpen(false);
  }

  function select(index) {
    setSelectedIndex(index);
    reset();
  }

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="flex justify-center items-center flex-1 bg-gray-300 hover:bg-gray-200 border rounded-xl px-4 py-2 m-2"
      >
        <Image
          src={tokens[selectedIndex].logoURL}
          alt={tokens[selectedIndex].symbol}
          width={30}
          height={30}
          unoptimized
          className="rounded-full"
        />
        <span className="mx-2 h-12 flex justify-center items-center">
          {tokens[selectedIndex].symbol} <ChevronDownIcon className="w-4 h-4 ml-1" />
        </span>
      </button>
      <Modal open={isOpen} onClose={reset}>
        <div className="flex flex-col dark:text-gray-200">
          <div className="flex flex-col border-b">
            <div className="flex justify-between items-center font-bold mx-4 mt-4">
              <p>Select a token</p>
              <button onClick={reset}>
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <input
              placeholder="Search name or paste address"
              className="border rounded-lg h-12 mx-4 mt-4 px-4 focus:outline-none focus:border-indigo-700 dark:focus:border-gray-900 dark:text-gray-900"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex justify-between mx-4 pt-8 pb-4">
              <span className="font-bold text-sm">Token name</span>
            </div>
          </div>
          <div className="flex flex-col max-h-[450px] overflow-auto">
            {tokens.map(({ logoURL, symbol }, index) => (
              <button
                key={index}
                onClick={() => select(index)}
                className={clsx(
                  selectedIndex === index && 'bg-gray-100 dark:bg-gray-800',
                  'flex items-center p-4 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                <Image src={logoURL} alt={symbol} width={40} height={40} unoptimized />
                <span className="mx-4">{symbol}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TokenModal;
