import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/modal';
import useSearching from 'hooks/useSearching';
import classname from 'utils/classname';

const conditions = {
  keys: ['symbol', 'address'],
  exact: ['address'],
};

function SelectTokenModal({ isOpen, setIsOpen, tokens, selectedToken, setSelectedToken }) {
  const [keyword, setKeyword] = useState('');
  const filteredTokens = useSearching(tokens, keyword, conditions);

  function handleClose() {
    setIsOpen(false);
    setKeyword('');
  }

  function handleSelect(token) {
    setSelectedToken(token);
    handleClose();
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="modal modal--token">
        <div className="modal__header">
          <p className="modal__title">Select a token</p>
          <button onClick={handleClose} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>

        <div className="modal__divider" />

        <div className="search">
          <input
            placeholder="Search name or paste address"
            onChange={(e) => setKeyword(e.target.value)}
            className="search__input"
          />
          <img src="/images/search.svg" alt="search" className="search__icon" />
        </div>

        <div className="modal__body">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token, index) => (
              <button
                key={index}
                onClick={() => handleSelect(token)}
                className={classname(
                  'modal__item modal__item--token',
                  token.symbol === selectedToken.symbol && 'modal__item--token-active'
                )}
              >
                <div className="token-group">
                  <img src={token.iconSrc} alt={token.symbol} className="token__img" />
                  <span className="token__symbol">{token.symbol}</span>
                </div>
                <span className="token__name">{token.name}</span>
              </button>
            ))
          ) : (
            <p className="empty-token">No tokens found</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

SelectTokenModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  tokens: PropTypes.arrayOf(PropTypes.shape({})),
  selectedToken: PropTypes.shape({
    symbol: PropTypes.string,
  }),
  setSelectedToken: PropTypes.func,
};

export default SelectTokenModal;
