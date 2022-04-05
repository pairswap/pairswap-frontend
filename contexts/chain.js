import { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { generate, findChainByChainId, findTokenBySymbol } from 'utils/chain';

export const ChainContext = createContext();

function ChainProvider({ children }) {
  const [chains, setChains] = useState([]);
  const [srcChain, setSrcChain] = useState(null);
  const [destChain, setDestChain] = useState(null);
  const [srcToken, setSrcToken] = useState(null);
  const [destToken, setDestToken] = useState(null);

  const selectToken = useCallback(
    (token) => {
      setSrcToken(token);
      setDestToken(findTokenBySymbol({ tokens: destChain.tokens, symbol: token.symbol }));
    },
    [destChain]
  );

  const selectSrcChain = useCallback(
    (chain) => {
      setSrcChain(chain);
      setSrcToken(findTokenBySymbol({ tokens: chain.tokens, symbol: srcToken.symbol }));
    },
    [srcToken]
  );

  const selectDestChain = useCallback(
    (chain) => {
      setDestChain(chain);
      setDestToken(findTokenBySymbol({ tokens: chain.tokens, symbol: srcToken.symbol }));
    },
    [srcToken]
  );

  const swapChain = useCallback(() => {
    setSrcChain(destChain);
    setDestChain(srcChain);
    setSrcToken(destToken);
    setDestToken(srcToken);
  }, [srcChain, destChain, srcToken, destToken]);

  const sync = useCallback(
    (chainId) => {
      const values = generate({
        chains,
        srcChain: findChainByChainId({ chains, chainId }),
      });

      setSrcChain(values.srcChain);
      setDestChain(values.destChain);
      setSrcToken(values.srcToken);
      setDestToken(values.destToken);
    },
    [chains]
  );

  useEffect(() => {
    if (window?.config?.supportedChains) {
      const supportedChains = window.config.supportedChains;
      const values = generate({ chains: supportedChains, srcChain: supportedChains[0] });

      setChains(supportedChains);
      setSrcChain(values.srcChain);
      setDestChain(values.destChain);
      setSrcToken(values.srcToken);
      setDestToken(values.destToken);
    }
  }, []);

  return (
    <ChainContext.Provider
      value={{
        chains,
        srcChain,
        destChain,
        srcToken,
        destToken,
        selectToken,
        selectSrcChain,
        selectDestChain,
        swapChain,
        sync,
      }}
    >
      {children}
    </ChainContext.Provider>
  );
}

ChainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChainProvider;
