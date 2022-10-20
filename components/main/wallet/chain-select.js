import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import useChain from 'hooks/useChain';
import useChainUpdate from 'hooks/useChainUpdate';

function ChainSelect() {
  const { chainInfos, srcChain } = useChain();
  const { setSrcChain } = useChainUpdate();

  return (
    <Menu as="div" className="dropdown">
      {chainInfos && srcChain ? (
        <>
          <Menu.Button className="dropdown__button">
            <img src={chainInfos[srcChain].icon} alt="wallet" className="dropdown__img" />
            <span>{chainInfos[srcChain].name}</span>
            <img src="images/chevron-down.svg" alt="dropdown icon" width={14} height={8} />
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
              {Object.keys(chainInfos).map((chain) => {
                if (chain !== srcChain) {
                  return (
                    <Menu.Item key={chain}>
                      <button onClick={() => setSrcChain(chain)} className="dropdown-menu__button">
                        <img
                          src={chainInfos[chain].icon}
                          alt="chain"
                          className="dropdown-menu__button-img"
                        />
                        <span>{chainInfos[chain].name}</span>
                      </button>
                    </Menu.Item>
                  );
                }
              })}
            </Menu.Items>
          </Transition>
        </>
      ) : (
        <div className="dropdown__button">
          <div className="spiner" />
        </div>
      )}
    </Menu>
  );
}

export default ChainSelect;
