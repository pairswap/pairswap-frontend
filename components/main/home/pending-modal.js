import PropTypes from 'prop-types';

import Modal from 'components/modal';
import useChain from 'hooks/useChain';

function PendingModal({ open, txHash }) {
  const { srcChain } = useChain();
  const blockExplorerUrl = srcChain?.blockExplorerUrls?.[0];

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="modal">
        <div className="loader" />
        <p className="modal__message">You have a pending transaction. Please wait for a while.</p>
        <p className="modal__note">Do not reload or close the browser.</p>
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

PendingModal.propTypes = {
  open: PropTypes.bool,
  txHash: PropTypes.string,
};

export default PendingModal;
