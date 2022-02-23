import Modal from 'components/modal';
import classname from 'utils/classname';

function SelectChainModal({
  isOpen,
  setIsOpen,
  chains,
  disabledChain,
  selectedChain,
  setSelectedChain,
}) {
  function handleClose() {
    setIsOpen(false);
  }

  function handleSelect(chain) {
    setSelectedChain(chain);
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
          {chains.map((chain, index) => (
            <button
              key={index}
              onClick={() => handleSelect(chain)}
              className={classname(
                'modal__item modal__item--chain',
                chain.chainId === disabledChain.chainId && 'modal__item--chain-disabled',
                chain.chainId === selectedChain.chainId && 'modal__item--chain-active'
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

export default SelectChainModal;
