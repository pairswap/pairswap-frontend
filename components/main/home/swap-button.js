import useChainUpdate from 'hooks/useChainUpdate';

function SwapButton() {
  const { swapChain } = useChainUpdate();

  return (
    <div className="form-group__title">
      Swap Chain
      <button onClick={swapChain} className="btn-swap-chain">
        <img src="/images/swap-chain.svg" alt="swap chain" className="btn-swap-chain__img" />
      </button>
    </div>
  );
}

export default SwapButton;
