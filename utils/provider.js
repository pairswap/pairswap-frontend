const available = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

const METAMASK = 'metamask';
const COINBASE = 'coinbase';

function hasMetamask() {
  if (window.ethereum.providers) {
    return window.ethereum.providers.some((provider) => provider.isMetaMask);
  }

  return window.ethereum.isMetaMask;
}

function hasCoinbase() {
  if (window.ethereum.providers) {
    return window.ethereum.providers.some((provider) => provider.isCoinbaseWallet);
  }

  return window.ethereum.isCoinbaseWallet;
}

function hasProvider(providerName) {
  if (!available) {
    return false;
  }

  switch (providerName) {
    case METAMASK:
      return hasMetamask();
    case COINBASE:
      return hasCoinbase();
    default:
      return false;
  }
}

function getMetamask() {
  if (window.ethereum.providers) {
    return window.ethereum.providers.find((provider) => provider.isMetaMask);
  }

  return window.ethereum;
}

function getCoinbase() {
  if (window.ethereum.providers) {
    return window.ethereum.providers.find((provider) => provider.isCoinbaseWallet);
  }

  return window.ethereum;
}

function getProvider(providerName) {
  if (!available) {
    return null;
  }

  switch (providerName) {
    case METAMASK:
      return getMetamask();
    case COINBASE:
      return getCoinbase();
    default:
      return null;
  }
}

export { METAMASK, COINBASE, available, getProvider, hasProvider };
