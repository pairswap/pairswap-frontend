import { useState, useEffect } from 'react';

import useWeb3 from 'hooks/useWeb3';
import useChain from 'hooks/useChain';
import { getTokenBalance } from 'request/rpc';
import { shortenBalance, convertBigNumberToString } from 'utils/transform';

function getAllTokenBalances(account, tokens) {
  const promises = tokens.map(async ({ address, symbol, iconSrc }) => {
    return getTokenBalance({ account, tokenAddress: address }).then((balance) => ({
      symbol,
      iconSrc,
      balance,
    }));
  });

  return Promise.all(promises);
}

function Main() {
  const [tokens, setTokens] = useState([]);
  const { account, connected } = useWeb3();
  const { srcChain } = useChain();

  useEffect(() => {
    if (connected && srcChain?.tokens) {
      getAllTokenBalances(account, srcChain.tokens).then(setTokens);
    }
  }, [account, connected, srcChain]);

  return (
    <main className="main">
      <div className="wallet">
        {tokens.map(({ symbol, iconSrc, balance }, index) => (
          <div key={index} className="wallet-token">
            <div className="wallet-token__group">
              <img src={iconSrc} alt="token" className="wallet-token__img" />
              <span className="wallet-token__text">{symbol}</span>
            </div>
            <span className="wallet-token__text">
              {balance ? shortenBalance(convertBigNumberToString(balance)) : null}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Main;
