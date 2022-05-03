import { useState, useEffect } from 'react';

import useWeb3 from 'hooks/useWeb3';
import useChain from 'hooks/useChain';
import { shortenBalance, convertBigNumberToString } from 'utils/transform';

function getAllTokenBalanceByChain({ account, library, supportedChains }) {
  const chainWithBalances = supportedChains.map(async (chain) => {
    const promises = chain.tokens.map(async (token) => {
      return library
        .getTokenBalanceByChain({
          account,
          tokenAddress: token.address,
          rpcUrls: chain.rpcUrls,
          chainId: chain.chainId,
        })
        .then((balance) => ({
          ...token,
          balance,
        }));
    });

    const tokens = await Promise.all(promises);
    return {
      ...chain,
      tokens,
    };
  });

  return Promise.all(chainWithBalances);
}

function Main() {
  const [chains, setChains] = useState([]);
  const { account, connected, library } = useWeb3();
  const { srcChain, supportedChains } = useChain();

  useEffect(() => {
    if (connected && account) {
      getAllTokenBalanceByChain({ account, library, supportedChains }).then(setChains);
    }
  }, [account, connected, library, srcChain, supportedChains]);

  if (chains.length === 0) {
    return null;
  }

  return (
    <main className="main">
      <div className="wallet">
        <div className="wallet__header">
          <div className="wallet__col"></div>
          {chains.map(({ chainName }, index) => (
            <div key={index} className="wallet__col wallet-header__text">
              {chainName}
            </div>
          ))}
        </div>
        <div className="wallet__body">
          <div className="wallet__col">
            {chains[0]?.tokens.map(({ symbol, iconSrc }, index) => (
              <div key={index} className="wallet__row">
                <img src={iconSrc} alt="token" className="wallet-token__img" />
                <span className="wallet-token__text">{symbol}</span>
              </div>
            ))}
          </div>
          {chains.map((chain, index) => (
            <div key={index} className="wallet__col">
              {chain?.tokens.map(({ balance }, index) => (
                <div key={index} className="wallet__row">
                  <span className="wallet-token__text">
                    {balance ? shortenBalance(convertBigNumberToString(balance)) : null}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Main;
