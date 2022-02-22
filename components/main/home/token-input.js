import { useState } from 'react';

import SelectTokenModal from 'components/modal/select-token';

function TokenInput({ amount, setAmount, tokens, selectedToken, setSelectedToken }) {
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
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
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

export default TokenInput;
