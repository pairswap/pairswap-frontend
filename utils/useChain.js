import { useEffect, useState } from 'react';

import useWeb3 from 'utils/useWeb3';
// import { requestChangeChain } from 'utils/injected';

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
    const _chainId = chainId ?? data[0].chainId;
    const _selectedSourceChain = findChain(data, _chainId);
    setSelectedSourceChain(_selectedSourceChain);

    const _destChains = filterChains(data, _selectedSourceChain.chainId);
    setDestChains(_destChains);

    const _selectedDestChain = _destChains[0];
    setSelectedDestChain(_selectedDestChain);

    const _sourceChains = filterChains(data, _selectedDestChain.chainId);
    setSourceChains(_sourceChains);
  }, [data, chainId]);

  // useEffect(() => {
  //   if (selectedSourceChain && chainId && selectedSourceChain.chainId !== chainId) {
  //     requestChangeChain(selectedSourceChain.chainId);
  //   }
  // }, [chainId, selectedSourceChain]);

  useEffect(() => {
    if (selectedSourceChain) {
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
