import PropTypes from 'prop-types';
import { XCircleIcon } from '@heroicons/react/outline';

import Toast from 'components/toast';

function ErrorToast({ message, open, onClose }) {
  return (
    <Toast open={open} onClose={onClose}>
      <div className="flex-shrink-0">
        <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
      </div>
      <div className="ml-3 w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium text-gray-900">Error</p>
        <p className="mt-1 text-sm text-gray-500">{message}</p>
      </div>
    </Toast>
  );
}

ErrorToast.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

ErrorToast.defaultProps = {
  message: 'An error has occurred',
  open: false,
  onClose: () => {},
};

export default ErrorToast;
