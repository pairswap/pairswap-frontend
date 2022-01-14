import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from 'config/connectors';

function useAuth() {
  const { activate } = useWeb3React();

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected);
      }
    });
  }, [activate]);
}

export default useAuth;
