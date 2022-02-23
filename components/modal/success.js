import shallow from 'zustand/shallow';

import Modal from 'components/modal';
import useSuccess from 'hooks/useSuccess';

function SuccessModal() {
  const { message, reset } = useSuccess(
    (state) => ({
      error: state.error,
      message: state.message,
      reset: state.reset,
    }),
    shallow
  );

  return (
    <Modal open={Boolean(message)} onClose={reset}>
      <div className="modal">
        <div className="modal__header modal__header--end">
          <button onClick={reset} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>

        <img src="/images/success.svg" alt="success" className="modal__img" />
        <div className="modal__message">{message}</div>
      </div>
    </Modal>
  );
}

export default SuccessModal;
