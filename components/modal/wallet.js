import PropTypes from 'prop-types';
import Image from 'next/image';
import { XIcon } from '@heroicons/react/solid';

import * as Connectors from 'constants/connectors';
import Modal from 'components/modal';
import useWeb3 from 'utils/useWeb3';

const wallets = {
  [Connectors.Injected]: 'Metamask',
};

function WalletModal({ open, onClose }) {
  const { activate, connectors } = useWeb3();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col">
        <div className="mb-4 flex items-center justify-between border-b p-4 font-bold">
          <p>Connect to a wallet</p>
          <button onClick={onClose}>
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        {Object.entries(connectors).map(([connectorName, connector], index) => (
          <button
            key={index}
            onClick={() => {
              activate(connector);
              onClose();
            }}
            className="m-4 flex justify-between rounded-lg bg-gray-100 p-4 hover:bg-gray-200"
          >
            <p className="font-bold">{wallets[connectorName]}</p>
            <Image src="/images/metamask.png" alt="metamask" width="24" height="24" />
          </button>
        ))}
      </div>
    </Modal>
  );
}

WalletModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default WalletModal;
