import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import supportedChains from 'config/chains';
import { useWeb3, useWeb3Update } from 'utils/useWeb3';

function filterChains(chains, chainId) {
  return chains.filter((chain) => chain.chainId !== chainId);
}

function findChain(chains, chainId) {
  return chains.find((chain) => chain.chainId === chainId);
}

export const ChainContext = createContext();
export const ChainUpdateContext = createContext();

function ChainProvider({ children }) {
  const { chainId } = useWeb3();
  const { changeChain } = useWeb3Update();
  const [sourceChains, setSourceChains] = useState([]);
  const [selectedSourceChain, setSelectedSourceChain] = useState();
  const [destChains, setDestChains] = useState([]);
  const [selectedDestChain, setSelectedDestChain] = useState();

  const changeSourceChain = useCallback(
    async (selectedChain) => {
      if (!chainId) {
        setSelectedSourceChain(selectedChain);
        setDestChains(filterChains(supportedChains, selectedChain.chainId));
      } else {
        changeChain(selectedChain);
      }
    },
    [chainId, changeChain]
  );

  const changeDestChain = useCallback((selectedChain) => {
    setSelectedDestChain(selectedChain);
    setSourceChains(filterChains(supportedChains, selectedChain.chainId));
  }, []);

  useEffect(() => {
    const _chainId = chainId ?? supportedChains[0].chainId;

    const _selectedSourceChain = findChain(supportedChains, _chainId);
    setSelectedSourceChain(_selectedSourceChain);

    const _destChains = filterChains(supportedChains, _selectedSourceChain.chainId);
    setDestChains(_destChains);

    const _selectedDestChain = _destChains[0];
    setSelectedDestChain(_selectedDestChain);

    const _sourceChains = filterChains(supportedChains, _selectedDestChain.chainId);
    setSourceChains(_sourceChains);
  }, [chainId]);

  return (
    <ChainContext.Provider
      value={{ sourceChains, selectedSourceChain, destChains, selectedDestChain }}
    >
      <ChainUpdateContext.Provider
        value={{ setSelectedSourceChain: changeSourceChain, setSelectedDestChain: changeDestChain }}
      >
        {children}
      </ChainUpdateContext.Provider>
    </ChainContext.Provider>
  );
}

ChainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChainProvider;
