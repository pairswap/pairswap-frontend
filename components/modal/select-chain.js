import PropTypes from 'prop-types';

import Modal from 'components/modal';
import useChain from 'hooks/useChain';
import classname from 'utils/classname';

function SelectChainModal({ isOpen, setIsOpen, chainId, setChainId, excludedChainId }) {
  const { supportedChains } = useChain();

  function handleClose() {
    setIsOpen(false);
  }

  function handleSelect(newChainId) {
    setChainId(newChainId);
    handleClose();
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="modal modal--chain">
        <div className="modal__header">
          <p className="modal__title">Select Chain</p>
          <button onClick={handleClose} className="btn-close-modal">
            <img src="/images/close.png" alt="close" />
          </button>
        </div>

        <div className="modal__divider" />

        <div>
          {supportedChains.map((chain, index) => (
            <button
              key={index}
              onClick={() => handleSelect(chain.chainId)}
              className={classname(
                'modal__item modal__item--chain',
                chain.chainId === excludedChainId && 'modal__item--chain-disabled',
                chain.chainId === chainId && 'modal__item--chain-active'
              )}
            >
              <img src={chain.iconSrc} alt={chain.chainName} className="token__img" />
              <span className="token__symbol">{chain.chainName}</span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

SelectChainModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  chainId: PropTypes.number,
  setChainId: PropTypes.func,
  excludedChainId: PropTypes.number,
};

export default SelectChainModal;
