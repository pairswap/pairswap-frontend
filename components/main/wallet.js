import { useState, useEffect } from 'react';

import useWeb3 from 'hooks/useWeb3';
import useChain from 'hooks/useChain';
import { shortenBalance, convertBigNumberToString } from 'utils/transform';

function getAllTokenBalances({ account, library, tokens }) {
  const promises = tokens.map(async ({ address, symbol, iconSrc }) => {
    return library.getTokenBalance({ account, tokenAddress: address }).then((balance) => ({
      symbol,
      iconSrc,
      balance,
    }));
  });

  return Promise.all(promises);
}

function Main() {
  const [items, setItems] = useState([]);
  const { account, connected, library } = useWeb3();
  const { srcChain } = useChain();

  useEffect(() => {
    if (connected && account && srcChain?.tokens) {
      getAllTokenBalances({ library, account, tokens: srcChain.tokens }).then(setItems);
    }
  }, [account, connected, library, srcChain]);

  return (
    <main className="main">
      <div className="wallet">
        {items.map(({ symbol, iconSrc, balance }, index) => (
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
