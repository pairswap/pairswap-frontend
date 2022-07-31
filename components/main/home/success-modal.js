import { useCallback } from 'react';
import PropTypes from 'prop-types';

import { CARDANO, ETHEREUM } from 'constants/wallet';
import Modal from 'components/modal';
import useChain from 'hooks/useChain';

function SuccessModal({ open, txHash, onClose }) {
  const { chainInfos, srcChain } = useChain();

  const renderLink = useCallback(() => {
    if (chainInfos && srcChain) {
      const { explorers, type } = chainInfos[srcChain];
      let link = '';

      if (type === CARDANO) {
        link = `${explorers[0]}/transaction/${txHash}`;
      }

      if (type === ETHEREUM) {
        link = `${explorers[0]}/tx/${txHash}`;
      }

      if (link) {
        return (
          <a href={link} target="_blank" rel="noreferrer" className="modal-message__link">
            Click here to view on block explorer.
          </a>
        );
      }

      return null;
    }

    return null;
  }, [chainInfos, srcChain, txHash]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal">
        <div className="modal__header modal__header--end">
          <button onClick={onClose} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>

        <img src="/images/success.svg" alt="success" className="modal__img" />
        <div className="modal__message">You have submited a transaction.</div>
        {renderLink()}
      </div>
    </Modal>
  );
}

SuccessModal.propTypes = {
  open: PropTypes.bool,
  txHash: PropTypes.string,
  onClose: PropTypes.func,
};

export default SuccessModal;
