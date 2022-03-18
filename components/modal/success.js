import shallow from 'zustand/shallow';

import chains from 'config/chains';
import Modal from 'components/modal';
import useSuccess from 'hooks/useSuccess';
import useWeb3 from 'hooks/useWeb3';

function findChainByChainId(chainId) {
  return chains.find((chain) => chain.chainId === chainId);
}

function SuccessModal() {
  const chainId = useWeb3((state) => state.chainId);
  const currentChain = findChainByChainId(chainId);

  const { message, hash, reset } = useSuccess(
    (state) => ({
      message: state.message,
      hash: state.hash,
      reset: state.reset,
    }),
    shallow
  );

  return (
    <Modal open={Boolean(message)} onClose={reset}>
      <div className="modal">
        <div className="modal__header modal__header--end">
          <button onClick={reset} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>

        <img src="/images/success.svg" alt="success" className="modal__img" />
        <div className="modal__message">{message}</div>
        {currentChain?.blockExplorerUrls ? (
          <a href={`${currentChain.blockExplorerUrls}/tx/${hash}`} className="modal-message__link">
            View on block explorer
          </a>
        ) : null}
      </div>
    </Modal>
  );
}

export default SuccessModal;
