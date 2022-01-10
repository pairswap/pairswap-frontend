import { useEffect, useState } from 'react';
import { hexlify } from '@ethersproject/bytes';

import { injected } from 'config/connectors';
import useWeb3 from 'utils/useWeb3';

function filterChains(chains, chainId) {
  return chains.filter((chain) => chain.chainId !== chainId);
}

function findChain(chains, chainId) {
  return chains.find((chain) => chain.chainId === chainId);
}

function useChain(data) {
  const { chainId } = useWeb3();
  const [sourceChains, setSourceChains] = useState([]);
  const [selectedSourceChain, setSelectedSourceChain] = useState();
  const [destChains, setDestChains] = useState([]);
  const [selectedDestChain, setSelectedDestChain] = useState();

  useEffect(() => {
    if (data && chainId) {
      const _selectedSourceChain = findChain(data, chainId);
      setSelectedSourceChain(_selectedSourceChain);

      const _destChains = filterChains(data, _selectedSourceChain.chainId);
      setDestChains(_destChains);

      const _selectedDestChain = _destChains[0];
      setSelectedDestChain(_selectedDestChain);

      const _sourceChains = filterChains(data, _selectedDestChain.chainId);
      setSourceChains(_sourceChains);
    }
  }, [data, chainId]);

  useEffect(() => {
    if (selectedSourceChain) {
      const hexString = `0x${selectedSourceChain.chainId.toString(16)}`;
      injected
        .getProvider()
        .then((provider) => {
          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [
              {
                chainId: hexString,
              },
            ],
          });
        })
        .catch((error) => {
          console.log(error);
        });
      const _destChains = filterChains(data, selectedSourceChain.chainId);
      setDestChains(_destChains);
    }
  }, [data, selectedSourceChain]);

  useEffect(() => {
    if (selectedDestChain) {
      const _sourceChains = filterChains(data, selectedDestChain.chainId);
      setSourceChains(_sourceChains);
    }
  }, [data, selectedDestChain]);

  return {
    sourceChains,
    selectedSourceChain,
    selectedDestChain,
    destChains,
    setSelectedSourceChain,
    setSelectedDestChain,
  };
}

export default useChain;
