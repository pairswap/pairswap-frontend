import PropTypes from 'prop-types';

import Modal from 'components/modal';
import useChain from 'hooks/useChain';

function SuccessModal({ open, txHash, onClose }) {
  const { srcChain } = useChain();
  const blockExplorerUrl = srcChain?.blockExplorerUrls?.[0];

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal">
        <div className="modal__header modal__header--end">
          <button onClick={onClose} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>

        <img src="/images/success.svg" alt="success" className="modal__img" />
        <div className="modal__message">You have made a transaction.</div>
        {txHash && blockExplorerUrl ? (
          <a
            href={`${blockExplorerUrl}/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="modal-message__link"
          >
            Click here to view on block explorer.
          </a>
        ) : null}
      </div>
    </Modal>
  );
}

SuccessModal.propTypes = {
  open: PropTypes.bool,
  txHash: PropTypes.string,
  onClose: PropTypes.func,
};

export default SuccessModal;
