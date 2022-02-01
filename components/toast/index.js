import { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';

const detail = {
  error: {
    icon: <XCircleIcon className="h-6 w-6 text-red-400" />,
    title: 'Error',
  },
  success: {
    icon: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
    title: 'Success',
  },
};

function Toast({ message, open, onClose, type }) {
  useEffect(() => {
    if (open) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [open, onClose]);

  if (!detail[type]) {
    return null;
  }

  const { icon, title } = detail[type];

  return (
    <div className="w-96 fixed bottom-0 left-0 flex items-end px-4 py-2">
      <div className="w-full flex flex-col">
        <Transition
          show={open}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="-translate-x-2 opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="-translate-x-2 opacity-0"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="py-2 px-4">
              <div className="flex justify-end items-start">
                <div className="flex-shrink-0">{icon}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="mt-1 text-sm text-gray-500">{message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
};

Toast.defaultProps = {
  message: '',
  open: false,
  onClose: () => {},
  type: null,
};

export default Toast;
