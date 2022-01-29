import PropTypes from 'prop-types';
import { CheckCircleIcon } from '@heroicons/react/outline';

import Toast from 'components/toast';

function SuccessToast({ message, open, onClose }) {
  return (
    <Toast open={open} onClose={onClose} autoHide>
      <div className="flex-shrink-0">
        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
      </div>
      <div className="ml-3 w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium text-gray-900">Success</p>
        <p className="mt-1 text-sm text-gray-500">{message}</p>
      </div>
    </Toast>
  );
}

SuccessToast.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

SuccessToast.defaultProps = {
  message: 'Your transaction has been done',
  open: false,
  onClose: () => {},
};

export default SuccessToast;
