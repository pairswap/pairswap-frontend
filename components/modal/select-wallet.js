import { useState, useCallback } from 'react';

import Modal from 'components/modal';
import { useWeb3Update } from 'utils/useWeb3';

function SelectWalletModal({ open, onClose }) {
  const { connect } = useWeb3Update();
  const [loading, setLoading] = useState(false);

  const handleConnect = useCallback(async () => {
    setLoading(true);
    await connect();
    setLoading(false);
    onClose();
  }, [connect, onClose]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal modal--wallet">
        <div className="modal__header">
          <p className="modal__title">Connect to a wallet</p>
          <button onClick={onClose} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>

        <div className="modal__divider" />

        {loading ? (
          <div className="btn-wallet btn-wallet--loading">
            <div className="spiner" />
            <p className="btn-wallet__text">Initializing...</p>
          </div>
        ) : (
          <button onClick={handleConnect} className="btn-wallet">
            <p className="btn-wallet__text">Metamask</p>
            <img src="/images/metamask.png" alt="metamask" className="btn-wallet__img" />
          </button>
        )}
      </div>
    </Modal>
  );
}

export default SelectWalletModal;
