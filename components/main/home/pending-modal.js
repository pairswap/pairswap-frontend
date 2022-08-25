import PropTypes from 'prop-types';

import Modal from 'components/modal';
import useChain from 'hooks/useChain';

function PendingModal({ open, txHash }) {
  const { chainInfos, srcChain } = useChain();

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="modal">
        <div className="loader" />
        <p className="modal__message">You have a pending transaction. Please wait for a while.</p>
        <p className="modal__note">Do not reload or close the browser.</p>
        {chainInfos && srcChain ? (
          <a
            href={`${chainInfos[srcChain].explorers[0]}/tx/${txHash}`}
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
