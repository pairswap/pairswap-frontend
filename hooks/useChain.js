import create from 'zustand';

import chains from 'config/chains';

function getDestChain(srcChain) {
  const filteredChains = chains.filter((chain) => chain.chainId !== srcChain.chainId);

  return filteredChains[0];
}

function findChainByChainId(chainId) {
  return chains.find((chain) => chain.chainId === chainId);
}

function findTokenBySymbol(tokens, symbol) {
  return tokens.find((token) => token.symbol === symbol);
}

function generate(srcChain) {
  const destChain = getDestChain(srcChain);
  const srcToken = srcChain.tokens[0];
  const destToken = findTokenBySymbol(destChain.tokens, srcToken.symbol);
  return { srcChain, destChain, srcToken, destToken };
}

const initialStates = {
  chains,
  ...generate(chains[0]),
};

const useChain = create((set) => ({
  ...initialStates,
  selectToken: (token) =>
    set((state) => ({
      srcToken: token,
      destToken: findTokenBySymbol(state.destChain.tokens, token.symbol),
    })),
  selectSrcChain: (chain) => {
    set((state) => ({
      srcChain: chain,
      srcToken: findTokenBySymbol(chain.tokens, state.srcToken.symbol),
    }));
  },
  selectDestChain: (chain) =>
    set((state) => ({
      destChain: chain,
      destToken: findTokenBySymbol(chain.tokens, state.srcToken.symbol),
    })),
  swapChain: () =>
    set((state) => ({
      srcChain: state.destChain,
      destChain: state.srcChain,
      srcToken: state.destToken,
      destToken: state.srcToken,
    })),
  sync: (chainId) => set({ ...generate(findChainByChainId(chainId)) }),
  reset: () => set(initialStates),
}));

export default useChain;
