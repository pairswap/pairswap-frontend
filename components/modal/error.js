import shallow from 'zustand/shallow';

import Modal from 'components/modal';
import useError from 'hooks/useError';

function ErrorModal() {
  const { error, message, reset } = useError(
    (state) => ({
      error: state.error,
      message: state.message,
      reset: state.reset,
    }),
    shallow
  );

  return (
    <Modal open={Boolean(error)} onClose={reset}>
      <div className="modal">
        <div className="modal__header modal__header--end">
          <button onClick={reset} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>
        <img src="/images/error.svg" alt="error" className="modal__img" />
        <div className="modal__message">{message}</div>
      </div>
    </Modal>
  );
}

export default ErrorModal;
