import { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';

function SuccessToast({ open, onClose }) {
  useEffect(() => {
    let timeoutId = setTimeout(() => onClose(), 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <Transition
      show={open}
      as={Fragment}
      enter="toast__enter"
      enterFrom="toast__hidden"
      enterTo="toast__visible"
      leave="toast__leave"
      leaveFrom="toast__visible"
      leaveTo="toast__hidden"
    >
      <div className="toast">
        <div>
          <div className="toast__title">Success</div>
          <div>Your transaction has been confirmed</div>
        </div>
        <button onClick={onClose} className="toast__close-button">
          <img src="/images/close.png" alt="close" />
        </button>
      </div>
    </Transition>
  );
}

SuccessToast.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SuccessToast;
