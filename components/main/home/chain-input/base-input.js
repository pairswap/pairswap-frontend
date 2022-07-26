import { useState } from 'react';
import PropTypes from 'prop-types';

import SelectChainModal from 'components/modal/select-chain';
import useChain from 'hooks/useChain';

function ChainInput({ label, chain, setChain, excludedChain }) {
  const [isOpen, setIsOpen] = useState(false);
  const { chainInfos } = useChain();

  return (
    <div className="chain-input">
      {chainInfos && chain ? (
        <button onClick={() => setIsOpen(true)} className="select-chain">
          <label className="select__label">{label}</label>
          <div className="select-chain__chain">
            <img
              src={chainInfos[chain].icon}
              alt={chainInfos[chain].name}
              className="select-chain__img"
            />
            <span className="select-chain__text">{chainInfos[chain].name}</span>

            <SelectChainModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setChain={setChain}
              currentChain={chain}
              excludedChain={excludedChain}
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
  setChain: PropTypes.func,
  chain: PropTypes.string,
  excludedChain: PropTypes.string,
};

export default ChainInput;
