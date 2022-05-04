import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function ChainSelect({ chains, selectedChain, setSelectedChain }) {
  return (
    <Menu as="div" className="dropdown">
      <Menu.Button className="dropdown__button">
        <img src={selectedChain?.iconSrc} alt="wallet" className="dropdown__img" />
        <span>{selectedChain?.chainName}</span>
        <img src="images/chevron-down.svg" alt="dropdown icon" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="dropdown__enter"
        enterFrom="dropdown__hidden"
        enterTo="dropdown__visible"
        leave="dropdown__leave"
        leaveFrom="dropdown__visible"
        leaveTo="dropdown__hidden"
      >
        <Menu.Items className="dropdown-menu">
          <div className="dropdown-arrow" />
          {chains.map((chain) => {
            if (chain?.chainId !== selectedChain?.chainId) {
              return (
                <Menu.Item key={chain.chainId}>
                  <button onClick={() => setSelectedChain(chain)} className="dropdown-menu__button">
                    <img src={chain.iconSrc} alt="chain" className="dropdown-menu__button-img" />
                    <span>{chain.chainName}</span>
                  </button>
                </Menu.Item>
              );
            }
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

ChainSelect.propTypes = {
  chains: PropTypes.arrayOf(PropTypes.shape({})),
  selectedChain: PropTypes.shape({
    chainId: PropTypes.number,
    chainName: PropTypes.string,
    iconSrc: PropTypes.string,
  }),
  setSelectedChain: PropTypes.func,
};

export default ChainSelect;
