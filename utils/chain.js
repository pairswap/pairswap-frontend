export function getDestChain({ chains, srcChain }) {
  const filteredChains = chains.filter((chain) => chain.chainId !== srcChain.chainId);

  return filteredChains[0];
}

export function findChainByChainId({ chains, chainId }) {
  return chains.find((chain) => chain.chainId === chainId);
}

export function findTokenBySymbol({ tokens, symbol }) {
  return tokens.find((token) => token.symbol === symbol);
}

export function generate({ chains, srcChain }) {
  const destChain = getDestChain({ chains, srcChain });
  const srcToken = srcChain.tokens[0];
  const destToken = findTokenBySymbol({ tokens: destChain.tokens, symbol: srcToken.symbol });
  return { srcChain, destChain, srcToken, destToken };
}

export function getChainIds({ chains }) {
  return chains.map((chain) => chain.chainId);
}
