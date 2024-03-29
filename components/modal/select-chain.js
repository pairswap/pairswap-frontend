import PropTypes from 'prop-types';

import Modal from 'components/modal';
import useChain from 'hooks/useChain';
import classname from 'utils/classname';

function SelectChainModal({ isOpen, setIsOpen, setChain, currentChain, excludedChain }) {
  const { chains, chainInfos } = useChain();

  function handleClose() {
    setIsOpen(false);
  }

  function handleSelect(chain) {
    setChain(chain);
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
          {chains &&
            chains.map((chain, index) => {
              const { name, icon } = chainInfos[chain];

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(chain)}
                  className={classname(
                    'modal__item modal__item--chain',
                    chain === excludedChain && 'modal__item--chain-disabled',
                    chain === currentChain && 'modal__item--chain-active'
                  )}
                >
                  <img src={icon} alt={name} className="token__img" />
                  <span className="token__symbol">{name}</span>
                </button>
              );
            })}
        </div>
      </div>
    </Modal>
  );
}

SelectChainModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  setChain: PropTypes.func,
  currentChain: PropTypes.string,
  excludedChain: PropTypes.string,
};

export default SelectChainModal;
