import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useChain } from 'utils/useChain';

export const TokenContext = createContext();
export const TokenUpdateContext = createContext();

function findBySymbol(tokens, symbol) {
  return tokens.find((token) => token.symbol === symbol);
}

function TokenProvider({ children }) {
  const { selectedSourceChain, selectedDestChain } = useChain();
  const [selectedSourceToken, setSelectedSourceToken] = useState();
  const [selectedDestToken, setSelectedDestToken] = useState();

  useEffect(() => {
    if (selectedSourceChain && selectedDestChain) {
      if (!selectedSourceToken || !selectedDestToken) {
        const _sourceToken = selectedSourceChain.tokens[0];
        setSelectedSourceToken(_sourceToken);

        const _destToken = findBySymbol(selectedDestChain.tokens, _sourceToken.symbol);
        setSelectedDestToken(_destToken);
      }
    }
  }, [selectedSourceChain, selectedDestChain, selectedSourceToken, selectedDestToken]);

  useEffect(() => {
    if (selectedSourceToken) {
      const _destToken = findBySymbol(selectedDestChain.tokens, selectedSourceToken.symbol);
      setSelectedDestToken(_destToken);
    }
  }, [selectedSourceToken, selectedDestChain]);

  useEffect(() => {
    if (selectedDestToken) {
      const _sourceToken = findBySymbol(selectedSourceChain.tokens, selectedDestToken.symbol);
      setSelectedSourceToken(_sourceToken);
    }
  }, [selectedDestToken, selectedSourceChain]);

  return (
    <TokenContext.Provider value={{ selectedSourceToken, selectedDestToken }}>
      <TokenUpdateContext.Provider value={{ setSelectedSourceToken, setSelectedDestToken }}>
        {children}
      </TokenUpdateContext.Provider>
    </TokenContext.Provider>
  );
}

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TokenProvider;
