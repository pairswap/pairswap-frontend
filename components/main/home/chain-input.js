import { useState } from 'react';

import Spiner from 'components/spiner';
import SelecteChainModal from 'components/modal/select-chain';

function ChainInput({ label, chains, selectedChain, setSelectedChain }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chain-input">
      {selectedChain ? (
        <button onClick={() => setIsOpen(true)} className="select-chain">
          <label className="form-group__item select__label">{label}</label>
          <div className="form-group__item select-chain__chain">
            <img
              src={selectedChain.iconSrc}
              alt={selectedChain.chainName}
              className="select-chain__img"
            />
            <span className="select-chain__text">{selectedChain.chainName}</span>

            <SelecteChainModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              chains={chains}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
            />
          </div>
          <div className="form-group__item select-dropdown-icon">
            <img src="/images/chevron-down.svg" alt="dropdown" />
          </div>
        </button>
      ) : (
        <Spiner />
      )}
    </div>
  );
}

export default ChainInput;
