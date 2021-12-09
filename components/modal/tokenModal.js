import { useState } from 'react';
import Image from 'next/image';
import Modal from '.';
import tokenList from '../../data/tokenlist.json';
import CloseIcon from '../icons/close';
import ChevronIcon from '../icons/chevron';

function TokenModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { tokens } = tokenList;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white border rounded-xl px-2 py-2 m-2"
      >
        Select a token <ChevronIcon className="inline ml-1" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col">
          <div className="flex flex-col border-b">
            <div className="flex justify-between items-center font-bold mx-4 mt-4">
              <p>Select a token</p>
              <button onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <input
              placeholder="Search name or paste address"
              className="border rounded-lg h-12 mx-4 mt-4 px-4 focus:outline-none focus:border-indigo-700"
            />
            <div className="flex justify-between mx-4 py-4">
              <span className="font-bold text-sm">Token name</span>
              <button className="border px-2 rounded-md">↑</button>
            </div>
          </div>
          <div className="flex flex-col max-h-[450px] overflow-auto">
            {tokens.map(({ address, symbol, logoURI }) => (
              <button key={address} className="flex items-center p-4 hover:bg-gray-100">
                <Image src={logoURI} alt={symbol} width={40} height={40} />
                <span className="mx-4">{symbol}</span>
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
