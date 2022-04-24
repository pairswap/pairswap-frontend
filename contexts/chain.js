import { createContext, useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ChainContext = createContext();
export const ChainContextUpdate = createContext();

function ChainProvider({ children }) {
  const [supportedChains, setSupportedChains] = useState([]);
  const [srcChainId, setSrcChainId] = useState(null);
  const [destChainId, setDestChainId] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);

  const srcChain = useMemo(
    () => supportedChains.find((chain) => chain.chainId === srcChainId),
    [srcChainId, supportedChains]
  );

  const destChain = useMemo(
    () => supportedChains.find((chain) => chain.chainId === destChainId),
    [destChainId, supportedChains]
  );

  const srcToken = useMemo(() => {
    if (srcChain?.tokens) {
      return srcChain.tokens.find((token) => token.symbol === tokenSymbol);
    }
  }, [srcChain, tokenSymbol]);

  const destToken = useMemo(() => {
    if (destChain?.tokens) {
      return destChain.tokens.find((token) => token.symbol === tokenSymbol);
    }
  }, [destChain, tokenSymbol]);

  const sync = useCallback(
    (chainId) => {
      if (chainId) {
        if (chainId === srcChainId) return;

        setSrcChainId(chainId);

        if (chainId !== destChainId) return;

        const destChain = supportedChains.find((chain) => chain.chainId !== chainId);

        if (!destChain) return;

        setDestChainId(destChain.chainId);
      }
    },
    [supportedChains, srcChainId, destChainId]
  );

  const swap = useCallback(() => {
    setSrcChainId(destChainId);
    setDestChainId(srcChainId);
  }, [srcChainId, destChainId]);

  useEffect(() => {
    const chains = window?.config?.supportedChains;

    if (chains) {
      setSupportedChains(chains);
      setSrcChainId(chains[0].chainId);
      setDestChainId(chains[1].chainId);
      setTokenSymbol(chains[0].tokens[0].symbol);
    }
  }, []);

  return (
    <ChainContextUpdate.Provider
      value={{ setSrcChainId, setDestChainId, setTokenSymbol, sync, swap }}
    >
      <ChainContext.Provider
        value={{
          supportedChains,
          srcChain,
          destChain,
          srcToken,
          destToken,
          srcChainId,
          destChainId,
          tokenSymbol,
        }}
      >
        {children}
      </ChainContext.Provider>
    </ChainContextUpdate.Provider>
  );
}

ChainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChainProvider;
