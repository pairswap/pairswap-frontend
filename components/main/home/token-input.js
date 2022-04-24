import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import SelectTokenModal from 'components/modal/select-token';
import useChain from 'hooks/useChain';
import useChainUpdate from 'hooks/useChainUpdate';

const TokenInput = forwardRef(({ name, onChange, onBlur }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { srcChain, srcToken, tokenSymbol } = useChain();
  const { setTokenSymbol } = useChainUpdate();

  return (
    <div className="token-input">
      <div className="input-group">
        <label htmlFor="amount" className="input__label">
          Send
        </label>
        <input
          ref={ref}
          name={name}
          id="amount"
          type="number"
          className="input"
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {tokenSymbol ? (
        <button onClick={() => setIsOpen(true)} className="select-token">
          <div className="select-token__token">
            <img src={srcToken.iconSrc} alt={srcToken.symbol} className="select-token__token-img" />
            <span className="select-token__token-text">{srcToken.symbol}</span>
          </div>

          <img src="/images/chevron-down.svg" alt="dropdown" />

          <SelectTokenModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            tokens={srcChain?.tokens}
            selectedToken={srcToken}
            setSelectedToken={setTokenSymbol}
          />
        </button>
      ) : (
        <div className="select-token select-token--loading">
          <div className="spiner" />
        </div>
      )}
    </div>
  );
});

TokenInput.displayName = 'TokenInput';

TokenInput.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default TokenInput;
