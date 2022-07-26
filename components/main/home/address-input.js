import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const AddressInput = forwardRef(({ name, onChange, onBlur }, ref) => {
  return (
    <div className="token-input">
      <div className="input-group">
        <label htmlFor="account" className="input__label">
          Recipient&apos;s address
        </label>
        <input
          ref={ref}
          name={name}
          id="account"
          className="input"
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
});

AddressInput.displayName = 'AddressInput';

AddressInput.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default AddressInput;
