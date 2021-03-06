import PropTypes from 'prop-types';

import Modal from 'components/modal';

function ErrorModal({ open, message, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal">
        <div className="modal__header modal__header--end">
          <button onClick={onClose} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>
        <img src="/images/error.svg" alt="error" className="modal__img" />
        <div className="modal__message">{message}</div>
      </div>
    </Modal>
  );
}

ErrorModal.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorModal;
