import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/modal';
import useError from 'hooks/useError';
import useWeb3 from 'hooks/useWeb3';
import { METAMASK, COINBASE } from 'utils/provider';

function SelectWalletModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const setError = useError();
  const { connect } = useWeb3();

  const handleConnect = useCallback(
    async (providerName) => {
      setLoading(true);
      try {
        await connect(providerName);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        onClose();
      }
    },
    [connect, onClose, setError]
  );

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
          <>
            <button onClick={() => handleConnect(METAMASK)} className="btn-wallet">
              <p className="btn-wallet__text">Metamask</p>
              <img src="/images/metamask.png" alt="metamask" className="btn-wallet__img" />
            </button>
            <button onClick={() => handleConnect(COINBASE)} className="btn-wallet">
              <p className="btn-wallet__text">Coinbase</p>
              <img src="/images/coinbase.png" alt="metamask" className="btn-wallet__img" />
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

SelectWalletModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SelectWalletModal;
