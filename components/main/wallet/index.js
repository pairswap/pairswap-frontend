import { useState, useEffect } from 'react';

import { WALLETS } from 'constants/wallet';
import useWeb3 from 'hooks/useWeb3';
import useChain from 'hooks/useChain';
import useToken from 'hooks/useToken';
import { shortenBalance } from 'utils/transform';
import ChainSelect from './chain-select';

async function getTokenBalanceByChain({ account, srcChain, library, tokenInfos, chainInfos }) {
  const { id, rpcs, tokens } = chainInfos[srcChain];
  const promises = tokens.map(async (token) => {
    const tokenAddress = tokenInfos[token].addresses[srcChain];

    return library
      .getTokenBalance({
        account,
        tokenAddress,
        rpcUrl: rpcs?.[0],
        chainId: id,
      })
      .then((balance) => ({
        ...tokenInfos[token],
        balance,
      }));
  });

  return Promise.all(promises);
}

function Main() {
  const [loading, setLoading] = useState(false);
  const { account, library, wallet } = useWeb3();
  const { chainInfos, srcChain } = useChain();
  const { tokenInfos } = useToken();
  const [selectedTokens, setSelectedTokens] = useState(null);

  useEffect(() => {
    if (account && library && chainInfos && tokenInfos && srcChain && wallet) {
      const { type } = chainInfos[srcChain];

      if (WALLETS[type].includes(wallet)) {
        setLoading(true);
        getTokenBalanceByChain({ account, srcChain, library, tokenInfos, chainInfos }).then(
          (tokens) => {
            setSelectedTokens(tokens);
            setLoading(false);
          }
        );
      } else {
        setSelectedTokens(null);
      }
    } else {
      setSelectedTokens(null);
    }
  }, [account, library, wallet, srcChain, tokenInfos, chainInfos]);

  return (
    <main className="main">
      <div className="wallet">
        <div className="wallet__header">
          <ChainSelect />
        </div>
        <div className="wallet__body">
          {loading ? (
            <div className="loader" />
          ) : selectedTokens ? (
            selectedTokens.map(({ icon, symbol, balance }, index) => (
              <div key={index} className="wallet__row">
                <div className="wallet__token">
                  <img src={icon} alt="token" className="wallet-token__img" />
                  <span className="wallet-token__text">{symbol}</span>
                </div>
                <span className="wallet-token__text">
                  {balance ? shortenBalance(balance) : null}
                </span>
              </div>
            ))
          ) : (
            <div className="wallet__guide">Please connect wallet to load your tokens</div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
