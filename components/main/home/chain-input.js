import { useState } from 'react';
import PropTypes from 'prop-types';

import SelectChainModal from 'components/modal/select-chain';

function ChainInput({ label, chains, disabledChain, selectedChain, setSelectedChain }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chain-input">
      {selectedChain ? (
        <button onClick={() => setIsOpen(true)} className="select-chain">
          <label className="select__label">{label}</label>
          <div className="select-chain__chain">
            <img
              src={selectedChain.iconSrc}
              alt={selectedChain.chainName}
              className="select-chain__img"
            />
            <span className="select-chain__text">{selectedChain.chainName}</span>

            <SelectChainModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              chains={chains}
              disabledChain={disabledChain}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
            />
          </div>
          <div className="select-dropdown-icon">
            <img src="/images/chevron-down.svg" alt="dropdown" />
          </div>
        </button>
      ) : (
        <div className="select-chain select-chain--loading">
          <div className="spiner" />
        </div>
      )}
    </div>
  );
}

ChainInput.propTypes = {
  label: PropTypes.string,
  chains: PropTypes.arrayOf(PropTypes.shape({})),
  disabledChain: PropTypes.shape({}),
  selectedChain: PropTypes.shape({
    chainName: PropTypes.string,
    iconSrc: PropTypes.string,
  }),
  setSelectedChain: PropTypes.func,
};

export default ChainInput;
