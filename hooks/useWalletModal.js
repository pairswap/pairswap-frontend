import { useContext } from 'react';

import { WalletModalContext } from 'components/modal/select-wallet';

function useWalletModal() {
  const state = useContext(WalletModalContext);

  return state;
}

export default useWalletModal;
