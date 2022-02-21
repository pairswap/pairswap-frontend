import { useState } from 'react';

import ChainInput from './chain-input';
import TokenInput from './token-input';
import TokenBalance from './token-balance';
import { useChain, useUpdateChain } from 'utils/useChain';
import { useToken, useUpdateToken } from 'utils/useToken';
import { useWeb3 } from 'utils/useWeb3';
import useSwap from 'utils/useSwap';

function Main() {
  const [amount, setAmount] = useState(0);
  const { sourceChains, selectedSourceChain, destChains, selectedDestChain } = useChain();
  const { setSelectedSourceChain, setSelectedDestChain } = useUpdateChain();
  const { selectedSourceToken, selectedDestToken } = useToken();
  const { setSelectedSourceToken } = useUpdateToken();
  const { transfer } = useSwap();
  const { account, active } = useWeb3();

  return (
    <main className="main">
      <section className="card">
        <div className="form-group">
          <div className="form-group__title">Select a token</div>
          <TokenInput
            amount={amount}
            setAmount={setAmount}
            tokens={selectedSourceChain?.tokens}
            selectedToken={selectedSourceToken}
            setSelectedToken={setSelectedSourceToken}
          />
        </div>

        <div className="form-group__footer">
          <TokenBalance />
        </div>

        <div className="card__divider" />

        <div className="form-group">
          <div className="form-group__title">
            Swap Chain
            <button className="btn-swap-chain">
              <img src="/images/swap-chain.svg" alt="swap chain" className="btn-swap-chain__img" />
            </button>
          </div>

          <ChainInput
            label="From"
            chains={sourceChains}
            selectedChain={selectedSourceChain}
            setSelectedChain={setSelectedSourceChain}
          />
          <ChainInput
            label="To"
            chains={destChains}
            selectedChain={selectedDestChain}
            setSelectedChain={setSelectedDestChain}
          />
        </div>

        <button
          onClick={() => {
            if (active) {
              transfer({
                contractAddress: selectedSourceChain.gatewayAddress,
                destChain: selectedDestChain.transferName,
                recipient: account,
                tokenOut: selectedSourceToken.address,
                tokenIn: selectedDestToken.address,
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
