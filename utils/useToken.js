import { useEffect, useState } from 'react';

function findBySymbol(tokens, symbol) {
  return tokens.find((token) => token.symbol === symbol);
}

function useToken({ sourceChain, destChain }) {
  const [sourceToken, setSourceToken] = useState();
  const [destToken, setDestToken] = useState();

  useEffect(() => {
    if (sourceChain && destChain) {
      if (!sourceToken || !destToken) {
        const _sourceToken = sourceChain.tokens[0];
        setSourceToken(_sourceToken);

        const _destToken = findBySymbol(destChain.tokens, _sourceToken.symbol);
        setDestToken(_destToken);
      }
    }
  }, [sourceChain, destChain, sourceToken, destToken]);

  useEffect(() => {
    if (sourceToken) {
      const _destToken = findBySymbol(destChain.tokens, sourceToken.symbol);
      setDestToken(_destToken);
    }
  }, [sourceToken, destChain]);

  useEffect(() => {
    if (destToken) {
      const _sourceToken = findBySymbol(sourceChain.tokens, destToken.symbol);
      setSourceToken(_sourceToken);
    }
  }, [destToken, sourceChain]);

  return { sourceToken, setSourceToken, destToken, setDestToken };
}

export default useToken;
