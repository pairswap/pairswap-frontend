import { useState, useEffect } from 'react';

import ChainInput from './chain-input';
import TokenInput from './token-input';
import TokenBalance from './token-balance';
import useChain from 'hooks/useChain';
import { useWeb3 } from 'utils/useWeb3';
import useSwap from 'utils/useSwap';

function Main() {
  const [amount, setAmount] = useState(0);
  const {
    chains,
    srcChain,
    destChain,
    srcToken,
    destToken,
    selectToken,
    selectSrcChain,
    selectDestChain,
    sync,
    swapChain,
  } = useChain();
  const { transfer } = useSwap();
  const { account, active, chainId } = useWeb3();

  useEffect(() => {
    if (active && chainId) {
      sync(chainId);
    }
  }, [active, chainId, sync]);

  return (
    <main className="main">
      <section className="card">
        <div className="form-group">
          <div className="form-group__title">Select a token</div>
          <TokenInput
            amount={amount}
            setAmount={setAmount}
            tokens={srcChain.tokens}
            selectedToken={srcToken}
            setSelectedToken={selectToken}
          />
        </div>

        <div className="form-group__footer">
          <TokenBalance />
        </div>

        <div className="card__divider" />

        <div className="form-group">
          <div className="form-group__title">
            Swap Chain
            <button onClick={swapChain} className="btn-swap-chain">
              <img src="/images/swap-chain.svg" alt="swap chain" className="btn-swap-chain__img" />
            </button>
          </div>

          <ChainInput
            label="From"
            chains={chains}
            disabledChain={destChain}
            selectedChain={srcChain}
            setSelectedChain={selectSrcChain}
          />
          <ChainInput
            label="To"
            chains={chains}
            disabledChain={srcChain}
            selectedChain={destChain}
            setSelectedChain={selectDestChain}
          />
        </div>

        <button
          onClick={() => {
            if (active) {
              transfer({
                contractAddress: srcChain.gatewayAddress,
                destChain: destChain.transferName,
                recipient: account,
                tokenOut: srcToken.address,
                tokenIn: destToken.address,
                amount,
              });
            }
          }}
          className="btn-swap"
        >
          Swap
        </button>
      </section>
    </main>
  );
}

export default Main;
