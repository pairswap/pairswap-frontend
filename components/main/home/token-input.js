import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import SelectTokenModal from 'components/modal/select-token';
import useToken from 'hooks/useToken';
import useTokenUpdate from 'hooks/useTokenUpdate';

const TokenInput = forwardRef(({ name, onChange, onBlur }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { tokenInfos, token } = useToken();
  const { setToken } = useTokenUpdate();

  return (
    <div className="token-input">
      <div className="input-group">
        <label htmlFor="amount" className="input__label">
          Amount
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
      {tokenInfos && token ? (
        <button onClick={() => setIsOpen(true)} className="select-token">
          <div className="select-token__token">
            <img src={tokenInfos[token].icon} alt={token} className="select-token__token-img" />
            <span className="select-token__token-text">{token}</span>
          </div>

          <img src="/images/chevron-down.svg" alt="dropdown" />

          <SelectTokenModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            tokens={Object.values(tokenInfos)}
            selectedToken={token}
            setSelectedToken={setToken}
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
