import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { METAMASK, COINBASE, NAMI } from 'constants/wallet';
import Modal from 'components/modal';
import useChain from 'hooks/useChain';
import useWeb3Update from 'hooks/useWeb3Update';

export const WalletModalContext = createContext();

const walletInfos = {
  [METAMASK]: {
    name: 'Metamask',
    icon: '/images/metamask.png',
  },
  [COINBASE]: {
    name: 'Coinbase',
    icon: '/images/coinbase.png',
  },
  [NAMI]: {
    name: 'Nami',
    icon: '/images/nami.png',
  },
};

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
      const { wallets } = chainInfos[srcChain];
      return wallets.map((wallet) => (
        <button key={wallet} onClick={() => handleConnect(wallet)} className="btn-wallet">
          <p className="btn-wallet__text">{walletInfos[wallet].name}</p>
          <img
            src={walletInfos[wallet].icon}
            alt={walletInfos[wallet].name}
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
