import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import SelectTokenModal from 'components/modal/select-token';

const TokenInput = forwardRef(
  ({ tokens, selectedToken, setSelectedToken, onChange, onBlur, name }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="token-input">
        <div className="input-group">
          <label htmlFor="amount" className="input__label">
            Send
          </label>
          <input
            name={name}
            ref={ref}
            id="amount"
            type="number"
            className="input"
            onChange={onChange}
            onBlur={onBlur}
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
);

TokenInput.displayName = 'TokenInput';

TokenInput.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  tokens: PropTypes.arrayOf(PropTypes.shape({})),
  selectedToken: PropTypes.shape({
    symbol: PropTypes.string,
    iconSrc: PropTypes.string,
  }),
  setSelectedToken: PropTypes.func,
};

export default TokenInput;
