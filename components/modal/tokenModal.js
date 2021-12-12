import { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Modal from '.';
import tokenList from '../../data/tokenlist.json';
import CloseIcon from '../icons/close';
import ChevronIcon from '../icons/chevron';

function TokenModal() {
  const { tokens: defaultTokens } = tokenList;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState();
  const [keyword, setKeyword] = useState('');
  const [previousKeyword, setPreviousKeyword] = useState('');
  const [tokens, setTokens] = useState(defaultTokens);

  useEffect(() => {
    if (keyword && keyword !== previousKeyword) {
      const filteredTokens = defaultTokens.filter((token) => {
        const name = token.symbol.toLowerCase();
        return name.includes(keyword);
      });

      setPreviousKeyword(keyword);
      setTokens(filteredTokens);
    }
  }, [keyword, previousKeyword, defaultTokens]);

  function reset() {
    setKeyword('');
    setPreviousKeyword('');
    setTokens(defaultTokens);
    setIsOpen(false);
  }

  function select(token) {
    setSelectedToken(token);
    reset();
  }

  return (
    <>
      {selectedToken ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 border rounded-xl px-4 py-2 m-2"
        >
          <Image
            src={selectedToken.logoURI}
            alt={selectedToken.symbol}
            width={30}
            height={30}
            unoptimized
            className="rounded-full"
          />
          <span className="mx-2">
            {selectedToken.symbol} <ChevronIcon className="inline ml-1" />
          </span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white border rounded-xl px-2 py-3 m-2"
        >
          <span>
            Select a token <ChevronIcon className="inline ml-1" />
          </span>
        </button>
      )}

      <Modal isOpen={isOpen} onClose={reset}>
        <div className="flex flex-col">
          <div className="flex flex-col border-b">
            <div className="flex justify-between items-center font-bold mx-4 mt-4">
              <p>Select a token</p>
              <button onClick={reset}>
                <CloseIcon />
              </button>
            </div>
            <input
              placeholder="Search name or paste address"
              className="border rounded-lg h-12 mx-4 mt-4 px-4 focus:outline-none focus:border-indigo-700"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex justify-between mx-4 py-4">
              <span className="font-bold text-sm">Token name</span>
              <button className="border px-2 rounded-md">↑</button>
            </div>
          </div>
          <div className="flex flex-col max-h-[450px] overflow-auto">
            {tokens.map((token, index) => (
              <button
                key={index}
                onClick={() => select(token)}
                className={clsx(
                  selectedToken === token && 'bg-gray-100',
                  'flex items-center p-4 hover:bg-gray-200'
                )}
              >
                <Image src={token.logoURI} alt={token.symbol} width={40} height={40} unoptimized />
                <span className="mx-4">{token.symbol}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="text-center border-t py-4">
          <button className="text-gray-600 hover:underline">Manage Token List</button>
        </div>
      </Modal>
    </>
  );
}

export default TokenModal;
