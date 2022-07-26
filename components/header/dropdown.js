import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { WALLET_INFOS } from 'constants/wallet';
import useWeb3 from 'hooks/useWeb3';
import useWeb3Update from 'hooks/useWeb3Update';

function Dropdown() {
  const { wallet } = useWeb3();
  const { logout } = useWeb3Update();
  const { name, icon } = WALLET_INFOS[wallet];

  return (
    <Menu as="div" className="dropdown">
      <Menu.Button className="dropdown__button">
        <img src={icon} alt={name} className="dropdown__img" />
        <span>{name}</span>
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
