import { Fragment, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import useWeb3Update from 'hooks/useWeb3Update';

function Listerner() {
  const [open, setOpen] = useState(false);
  const { destChain } = useChain();
  const { account, connected, supported, library } = useWeb3();
  const { reloadBalance } = useWeb3Update();

  useEffect(() => {
    if (open) {
      let timeoutId = setTimeout(() => setOpen(false), 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [open]);

  useEffect(() => {
    if (library) {
      function onTransferIn(token, recipient, amount) {
        if (connected && supported && account.toLowerCase() === recipient.toLowerCase()) {
          reloadBalance();
          setOpen(true);
        }
      }

      const contract = library.getGatewayContract(destChain);

      contract.on('TransferInEvent', onTransferIn);

      return () => contract.off('TransferInEvent', onTransferIn);
    }
  }, [account, connected, supported, library, destChain, reloadBalance]);

  return (
    <Transition
      show={open}
      as={Fragment}
      enter="toast__enter"
      enterFrom="toast__hidden"
      enterTo="toast__visible"
      leave="toast__leave"
      leaveFrom="toast__visible"
      leaveTo="toast__hidden"
    >
      <div className="toast">
        <div>
          <div className="toast__title">Success</div>
          <div>Your transaction has been confirmed</div>
        </div>
        <button onClick={() => setOpen(false)} className="toast__close-button">
          <img src="/images/close.png" alt="close" />
        </button>
      </div>
    </Transition>
  );
}

export default Listerner;
