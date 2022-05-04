import { useState, useEffect, useCallback } from 'react';

import useWeb3 from 'hooks/useWeb3';
import useChain from 'hooks/useChain';
import { shortenBalance, convertBigNumberToString } from 'utils/transform';
import ChainSelect from './chain-select';

async function getTokenBalanceByChain({ account, chain, library }) {
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

  return Promise.all(promises);
}

function Main() {
  const [loading, setLoading] = useState(false);
  const { account, connected, library } = useWeb3();
  const { supportedChains } = useChain();
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedTokens, setSelectedTokens] = useState([]);

  const changeSelectedChain = useCallback(
    (chain) => {
      setSelectedChain(chain);
      setLoading(true);
      getTokenBalanceByChain({ account, chain, library }).then((tokens) => {
        setSelectedTokens(tokens);
        setLoading(false);
      });
    },
    [account, library]
  );

  useEffect(() => {
    if (connected && account) {
      changeSelectedChain(supportedChains[0]);
    }
  }, [account, connected, changeSelectedChain, supportedChains]);

  if (!connected) {
    return null;
  }

  return (
    <main className="main">
      <div className="wallet">
        <div className="wallet__header">
          <ChainSelect
            chains={supportedChains}
            selectedChain={selectedChain}
            setSelectedChain={changeSelectedChain}
          />
        </div>
        <div>
          {loading ? (
            <div className="loader" />
          ) : (
            selectedTokens.map(({ iconSrc, symbol, balance }, index) => (
              <div key={index} className="wallet__row">
                <div className="wallet__token">
                  <img src={iconSrc} alt="token" className="wallet-token__img" />
                  <span className="wallet-token__text">{symbol}</span>
                </div>
                <span className="wallet-token__text">
                  {balance ? shortenBalance(convertBigNumberToString(balance)) : null}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
