import { useState, useEffect } from 'react';

import useChain from 'hooks/useChain';
import useToken from 'hooks/useToken';
import useWeb3 from 'hooks/useWeb3';
import { getHistory } from 'request/rest';
import { formatDate, shortenHash } from 'utils/transform';
import classname from 'utils/classname';

const limit = 10;

function History() {
  const [histories, setHistories] = useState(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const { chainInfos } = useChain();
  const { tokenInfos } = useToken();
  const { account } = useWeb3();

  useEffect(() => {
    if (account) {
      getHistory({ address: account })
        .then(({ data }) => {
          setHistories(data.histories);
          setPages(Math.ceil(data.histories.length / limit));
        })
        .catch((error) => console.error(error));
    } else {
      setHistories(null);
    }
  }, [account]);

  if (!histories || histories.length === 0) return null;

  return (
    <main className="main">
      <div className="history">
        <div className="history__header">
          <div className="history__row">
            <div className="history__row-item">Token</div>
            <div className="history__row-item">From</div>
            <div className="history__row-item">To</div>
            <div className="history__row-item history__row-item--small">Amount</div>
            <div className="history__row-item">Transaction hash</div>
            <div className="history__row-item">Created at</div>
          </div>
        </div>
        <div className="history__body">
          {histories
            .slice(page * limit, page * limit + limit)
            .map(
              (
                {
                  token_symbol: tokenSymbol,
                  src_chain: srcChain,
                  dest_chain: destChain,
                  amount,
                  src_hash: srcHash,
                  src_link: srcLink,
                  created_at: createdAt,
                },
                index
              ) => (
                <div key={index} className="history__row">
                  <div className="history__row-item history__row-item--left">
                    <img
                      src={tokenInfos[tokenSymbol].icon}
                      alt="token"
                      className="wallet-token__img"
                    />
                    <span className="history__name">{tokenSymbol}</span>
                  </div>
                  <div className="history__row-item history__row-item--left">
                    <img
                      src={chainInfos[srcChain].icon}
                      alt="source chain"
                      className="wallet-token__img"
                    />
                    <span className="history__name">{chainInfos[srcChain].name}</span>
                  </div>
                  <div className="history__row-item history__row-item--left">
                    <img
                      src={chainInfos[destChain].icon}
                      alt="source chain"
                      className="wallet-token__img"
                    />
                    <span className="history__name">{chainInfos[destChain].name}</span>
                  </div>
                  <div className="history__row-item history__row-item--small">{amount}</div>
                  <div className="history__row-item">
                    <a href={srcLink} target="_blank" rel="noreferrer" className="history__link">
                      {shortenHash(srcHash)}
                    </a>
                  </div>
                  <div className="history__row-item">{formatDate(createdAt)}</div>
                </div>
              )
            )}
        </div>
      </div>
      <div className="pagination">
        {pages > 1 ? (
          <>
            <button
              onClick={() => setPage((prevState) => prevState - 1)}
              disabled={page === 0}
              className={classname(page === 0 && 'page--disabled')}
            >
              <img src="/images/chevron-left.svg" alt="previous" />
            </button>
            <button
              onClick={() => setPage((prevState) => prevState + 1)}
              disabled={page + 1 >= pages}
              className={classname(page + 1 >= pages && 'page--disabled')}
            >
              <img src="/images/chevron-right.svg" alt="next" />
            </button>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default History;
