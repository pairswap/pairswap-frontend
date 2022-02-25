import { useState } from 'react';
import PropTypes from 'prop-types';

import SelectTokenModal from 'components/modal/select-token';

function TokenInput({ register, tokens, selectedToken, setSelectedToken }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="token-input">
      <div className="input-group">
        <label htmlFor="amount" className="input__label">
          Send
        </label>
        <input
          id="amount"
          type="number"
          className="input"
          min="0"
          {...register('amount', { required: true, validate: (value) => Number(value) > 0 })}
        />
      </div>
      {selectedToken ? (
        <button onClick={() => setIsOpen(true)} className="select-token">
          <div className="select-token__token">
            <img
              src={selectedToken.iconSrc}
              alt={selectedToken.symbol}
              className="select-token__token-img"
            />
            <span className="select-token__token-text">{selectedToken.symbol}</span>
          </div>

          <img src="/images/chevron-down.svg" alt="dropdown" />

          <SelectTokenModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            tokens={tokens}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
          />
        </button>
      ) : (
        <div className="select-token select-token--loading">
          <div className="spiner" />
        </div>
      )}
    </div>
  );
}

TokenInput.propTypes = {
  register: PropTypes.func,
  tokens: PropTypes.arrayOf(PropTypes.shape({})),
  selectedToken: PropTypes.shape({
    symbol: PropTypes.string,
    iconSrc: PropTypes.string,
  }),
  setSelectedToken: PropTypes.func,
};

export default TokenInput;
