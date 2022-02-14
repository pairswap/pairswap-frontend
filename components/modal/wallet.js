import PropTypes from 'prop-types';
import { XIcon } from '@heroicons/react/solid';

import Modal from 'components/modal';
import { useWeb3Update } from 'utils/useWeb3';

function WalletModal({ open, onClose }) {
  const { connect } = useWeb3Update();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col">
        <div className="mb-4 flex items-center justify-between border-b p-4 font-bold">
          <p>Connect to a wallet</p>
          <button onClick={onClose}>
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => {
            connect();
            onClose();
          }}
          className="m-4 flex justify-between rounded-lg bg-gray-100 p-4 hover:bg-gray-200"
        >
          <p className="font-bold">Metamask</p>
          <img src="/images/metamask.png" alt="metamask" className="h-6 w-6" />
        </button>
      </div>
    </Modal>
  );
}

WalletModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default WalletModal;
