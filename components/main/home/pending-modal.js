import PropTypes from 'prop-types';

import chains from 'config/chains';
import Modal from 'components/modal';
import useWeb3 from 'hooks/useWeb3';

function findChainByChainId(chainId) {
  return chains.find((chain) => chain.chainId === chainId);
}

function PendingModal({ open, txHash }) {
  console.log(txHash);
  const { chainId } = useWeb3();
  const currentChain = findChainByChainId(chainId);

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="modal">
        <div className="loader" />
        <p className="modal__message">You have a pending transaction. Please wait for a while.</p>
        <p className="modal__note">Do not reload or close the browser.</p>
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

PendingModal.propTypes = {
  open: PropTypes.bool,
  txHash: PropTypes.string,
};

export default PendingModal;
