import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';

function Modal({ open, onClose, children }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="modal-container" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="modal-container__enter"
          enterFrom="modal-container__hidden"
          enterTo="modal-container__visible"
          leave="modal-container__leave"
          leaveFrom="modal-container__visible"
          leaveTo="modal-container__hidden"
        >
          <Dialog.Overlay className="modal-overlay" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="modal-container__enter"
          enterFrom="modal-container__hidden"
          enterTo="modal-container__visible"
          leave="modal-container__leave"
          leaveFrom="modal-container__visible"
          leaveTo="modal-container__hidden"
        >
          <div>{children}</div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Modal;
