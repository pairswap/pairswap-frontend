import { useCallback } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/modal';
import { shortenHash } from 'utils/transform';

function SuccessModal({ open, links, txHash, onClose }) {
  const renderLinks = useCallback(() => {
    if (links) {
      const { srcLink, destLink } = links;

      return (
        <div>
          {srcLink ? (
            <p className="success-modal__message">
              <a href={srcLink} target="_blank" rel="noreferrer" className="success-modal__link">
                {shortenHash(txHash)}
              </a>
            </p>
          ) : null}
          {destLink ? (
            <p className="success-modal__message">
              Please wait and follow your transaction in the destination chain{' '}
              <a href={destLink} target="_blank" rel="noreferrer" className="success-modal__link">
                here
              </a>
            </p>
          ) : null}
        </div>
      );
    }

    return null;
  }, [links, txHash]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal">
        <div className="modal__header modal__header--end">
          <button onClick={onClose} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>

        <img src="/images/success.svg" alt="success" className="modal__img" />
        <div className="modal__message">You have submited a transaction.</div>
        {renderLinks()}
      </div>
    </Modal>
  );
}

SuccessModal.propTypes = {
  open: PropTypes.bool,
  txHash: PropTypes.string,
  links: PropTypes.shape({
    srcLink: PropTypes.string,
    destLink: PropTypes.string,
  }),
  onClose: PropTypes.func,
};

export default SuccessModal;
