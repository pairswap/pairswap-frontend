import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useLocalStorage from 'hooks/useLocalStorage';

export const TokenContext = createContext();
export const TokenContextUpdate = createContext();

function TokenProvider({ children }) {
  const [tokens, setTokens] = useState(null);
  const [tokenInfos, setTokenInfos] = useState(null);
  const [token, setToken] = useLocalStorage('token', null);

  useEffect(() => {
    if (tokens && tokens.length > 0 && (!token || !tokens.includes(token))) {
      setToken(tokens[0]);
    }
  }, [tokens, token, setToken]);

  useEffect(() => {
    if (window?.config) {
      const { tokens, tokenInfos } = window.config;
      setTokens(tokens);
      setTokenInfos(tokenInfos);
    }
  }, []);

  return (
    <TokenContextUpdate.Provider value={{ setToken }}>
      <TokenContext.Provider value={{ tokens, tokenInfos, token }}>
        {children}
      </TokenContext.Provider>
    </TokenContextUpdate.Provider>
  );
}

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TokenProvider;
