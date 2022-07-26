import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { WALLETS, WALLET_INFOS } from 'constants/wallet';
import Modal from 'components/modal';
import useChain from 'hooks/useChain';
import useWeb3Update from 'hooks/useWeb3Update';

export const WalletModalContext = createContext();

export function WalletModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const { connect } = useWeb3Update();
  const { chainInfos, srcChain } = useChain();

  const handleConnect = useCallback(
    async (providerName) => {
      setLoading(true);
      await connect(providerName);
      setLoading(false);
      onClose();
    },
    [connect, onClose]
  );

  const renderWallets = useCallback(() => {
    if (chainInfos && srcChain) {
      const { type } = chainInfos[srcChain];
      const wallets = WALLETS[type];

      return wallets.map((wallet) => (
        <button key={wallet} onClick={() => handleConnect(wallet)} className="btn-wallet">
          <p className="btn-wallet__text">{WALLET_INFOS[wallet].name}</p>
          <img
            src={WALLET_INFOS[wallet].icon}
            alt={WALLET_INFOS[wallet].name}
            className="btn-wallet__img"
          />
        </button>
      ));
    }

    return null;
  }, [chainInfos, srcChain, handleConnect]);

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
          renderWallets()
        )}
      </div>
    </Modal>
  );
}

WalletModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
