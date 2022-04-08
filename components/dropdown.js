import { Fragment, useCallback } from 'react';
import { Menu, Transition } from '@headlessui/react';

import useWeb3 from 'hooks/useWeb3';
import { METAMASK, COINBASE } from 'utils/provider';

function Dropdown() {
  const { connected, logout } = useWeb3();

  const renderDropdownButton = useCallback(() => {
    switch (connected) {
      case METAMASK:
        return (
          <>
            <img src="images/metamask.png" alt="wallet" className="dropdown__img" />
            <span>Metamask</span>
            <img src="images/chevron-down.svg" alt="dropdown icon" />
          </>
        );
      case COINBASE:
        return (
          <>
            <img src="images/coinbase.png" alt="wallet" className="dropdown__img" />
            <span>Coinbase</span>
            <img src="images/chevron-down.svg" alt="dropdown icon" />
          </>
        );
      default:
        return null;
    }
  }, [connected]);

  return (
    <Menu as="div" className="dropdown">
      <Menu.Button className="dropdown__button">{renderDropdownButton()}</Menu.Button>
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
          <Menu.Item>
            <button onClick={logout} className="dropdown-menu__button">
              <img src="images/logout.svg" alt="logout" className="dropdown-menu__button-img" />
              <span>Log out</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
