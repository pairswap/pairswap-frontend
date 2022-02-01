import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';

function Modal({ open, onClose, children }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 flex items-center justify-center"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mx-4 inline-block w-full max-w-sm transform rounded-xl border bg-white shadow-xl transition-all sm:mx-0">
            {children}
          </div>
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
