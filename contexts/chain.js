import { createContext, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

import chains from 'config/chains';

export const ChainContext = createContext();

function getDestChain(srcChain) {
  const filteredChains = chains.filter((chain) => chain.chainId !== srcChain.chainId);

  return filteredChains[0];
}

function findChainByChainId(chainId) {
  return chains.find((chain) => chain.chainId === chainId);
}

function findTokenBySymbol(tokens, symbol) {
  return tokens.find((token) => token.symbol === symbol);
}

function generate(srcChain) {
  const destChain = getDestChain(srcChain);
  const srcToken = srcChain.tokens[0];
  const destToken = findTokenBySymbol(destChain.tokens, srcToken.symbol);
  return { srcChain, destChain, srcToken, destToken };
}

const initialStates = {
  chains,
  ...generate(chains[0]),
};

function reducer(state, action) {
  switch (action.type) {
    case 'selectToken': {
      const token = action.payload;

      return {
        ...state,
        srcToken: token,
        destToken: findTokenBySymbol(state.destChain.tokens, token.symbol),
      };
    }
    case 'selectSrcChain': {
      const chain = action.payload;

      return {
        ...state,
        srcChain: chain,
        srcToken: findTokenBySymbol(chain.tokens, state.srcToken.symbol),
      };
    }
    case 'selectDestChain': {
      const chain = action.payload;

      return {
        ...state,
        destChain: chain,
        destToken: findTokenBySymbol(chain.tokens, state.srcToken.symbol),
      };
    }
    case 'swapChain': {
      return {
        ...state,
        srcChain: state.destChain,
        destChain: state.srcChain,
        srcToken: state.destToken,
        destToken: state.srcToken,
      };
    }
    case 'sync': {
      const chainId = action.payload;

      return {
        ...state,
        ...generate(findChainByChainId(chainId)),
      };
    }
    case 'reset': {
      return initialStates;
    }
    default: {
      return state;
    }
  }
}

function ChainProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialStates);

  const selectToken = useCallback((token) => {
    dispatch({ type: 'selectToken', payload: token });
  }, []);

  const selectSrcChain = useCallback((chain) => {
    dispatch({ type: 'selectSrcChain', payload: chain });
  }, []);

  const selectDestChain = useCallback((chain) => {
    dispatch({ type: 'selectDestChain', payload: chain });
  }, []);

  const swapChain = useCallback(() => {
    dispatch({ type: 'swapChain' });
  }, []);

  const sync = useCallback((chainId) => {
    dispatch({ type: 'sync', payload: chainId });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  return (
    <ChainContext.Provider
      value={{
        ...state,
        selectToken,
        selectSrcChain,
        selectDestChain,
        swapChain,
        sync,
        reset,
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
