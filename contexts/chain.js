import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import useToken from 'hooks/useToken';
import useLocalStorage from 'hooks/useLocalStorage';

export const ChainContext = createContext();
export const ChainContextUpdate = createContext();

function ChainProvider({ children }) {
  const [chains, setChains] = useState(null);
  const [chainInfos, setChainInfos] = useState(null);
  const [srcChain, setSrcChain] = useLocalStorage('srcChain', null);
  const [destChain, setDestChain] = useLocalStorage('destChain', null);
  const { tokenInfos, token } = useToken();

  const swapChain = useCallback(() => {
    if (!srcChain || !destChain) return;

    setSrcChain(destChain);
    setDestChain(srcChain);
  }, [srcChain, destChain, setSrcChain, setDestChain]);

  useEffect(() => {
    if (tokenInfos && token) {
      const { chains: newChains } = tokenInfos[token];
      setChains(newChains);

      let newSrcChain = srcChain;

      if (!srcChain || !newChains.includes(srcChain)) {
        newSrcChain = newChains[0];
        setSrcChain(newSrcChain);
      }

      if (!destChain || destChain === newSrcChain || !newChains.includes(destChain)) {
        let newDestChain = newChains.find((chain) => chain !== newSrcChain);
        setDestChain(newDestChain);
      }
    }
  }, [tokenInfos, token, srcChain, destChain, setSrcChain, setDestChain]);

  useEffect(() => {
    if (window?.config) {
      const { chainInfos } = window.config;
      setChainInfos(chainInfos);
    }
  }, []);

  return (
    <ChainContextUpdate.Provider value={{ setSrcChain, setDestChain, swapChain }}>
      <ChainContext.Provider value={{ chains, chainInfos, srcChain, destChain }}>
        {children}
      </ChainContext.Provider>
    </ChainContextUpdate.Provider>
  );
}

ChainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChainProvider;
