import PropTypes from 'prop-types';

import chains from 'config/chains';
import Modal from 'components/modal';
import useWeb3 from 'hooks/useWeb3';

function findChainByChainId(chainId) {
  return chains.find((chain) => chain.chainId === chainId);
}

function SuccessModal({ open, txHash, onClose }) {
  const { chainId } = useWeb3();
  const currentChain = findChainByChainId(chainId);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal">
        <div className="modal__header modal__header--end">
          <button onClick={onClose} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>

        <img src="/images/success.svg" alt="success" className="modal__img" />
        <div className="modal__message">You have made a transaction.</div>
        {txHash && currentChain?.blockExplorerUrls?.length ? (
          <a
            href={`${currentChain.blockExplorerUrls[0]}/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="modal-message__link"
          >
            Click here to view on block explorer.
          </a>
        ) : null}
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
