import { useState } from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import SelectTokenModal from 'components/modal/select-token';
import NumberFormat from 'react-number-format';
import useToken from 'hooks/useToken';
import useTokenUpdate from 'hooks/useTokenUpdate';

function TokenInput({ control }) {
  const [isOpen, setIsOpen] = useState(false);
  const { tokenInfos, token } = useToken();
  const { setToken } = useTokenUpdate();

  return (
    <div className="token-input">
      <div className="input-group">
        <label htmlFor="amount" className="input__label">
          Amount
        </label>
        <Controller
          render={({ field }) => {
            const { name, ref, onChange, onBlur } = field;

            return (
              <NumberFormat
                id="amount"
                ref={ref}
                name={name}
                onBlur={onBlur}
                onValueChange={(c) => onChange(c.floatValue)}
                allowEmptyFormatting
                thousandSeparator
                className="input"
                autoComplete="off"
              />
            );
          }}
          name="amount"
          control={control}
        />
      </div>
      {tokenInfos && token ? (
        <button onClick={() => setIsOpen(true)} className="select-token">
          <div className="select-token__token">
            <img src={tokenInfos[token].icon} alt={token} className="select-token__token-img" />
            <span className="select-token__token-text">{token}</span>
          </div>

          <img src="images/chevron-down.svg" alt="dropdown icon" width={14} height={8} />

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
}

TokenInput.propTypes = {
  control: PropTypes.shape({}),
};

export default TokenInput;
