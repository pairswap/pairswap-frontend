import { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';

function Toast({ autoHide, open, onClose, children, timeout }) {
  useEffect(() => {
    if (autoHide) {
      let timeoutId = setTimeout(() => onClose(), timeout);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [autoHide, onClose, timeout]);

  return (
    <>
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
                  {children}
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
    </>
  );
}

Toast.propTypes = {
  autoHide: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  timeout: PropTypes.number,
};

Toast.defaultProps = {
  autoHide: false,
  open: false,
  onClose: () => {},
  timeout: 3000,
};

export default Toast;
