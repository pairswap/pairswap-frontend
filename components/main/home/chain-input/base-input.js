import { useState } from 'react';
import PropTypes from 'prop-types';

import SelectChainModal from 'components/modal/select-chain';

function ChainInput({ label, chain, setChainId, excludedChainId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chain-input">
      {chain ? (
        <button onClick={() => setIsOpen(true)} className="select-chain">
          <label className="select__label">{label}</label>
          <div className="select-chain__chain">
            <img src={chain.iconSrc} alt={chain.chainName} className="select-chain__img" />
            <span className="select-chain__text">{chain.chainName}</span>

            <SelectChainModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              chainId={chain.chainId}
              setChainId={setChainId}
              excludedChainId={excludedChainId}
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
  chain: PropTypes.shape({
    chainId: PropTypes.number,
    chainName: PropTypes.string,
    iconSrc: PropTypes.string,
  }),
  setChainId: PropTypes.func,
  excludedChainId: PropTypes.number,
};

export default ChainInput;
