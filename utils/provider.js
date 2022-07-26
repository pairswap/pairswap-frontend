import { METAMASK, COINBASE, NAMI, FLINT } from 'constants/wallet';
import EthereumLibrary from 'request/ethereum';
import CardanoLibrary from 'request/cardano';

function hasMetamask() {
  if (!window.ethereum) return false;

  if (window.ethereum.providers) {
    return window.ethereum.providers.some((provider) => provider.isMetaMask);
  }

  return window.ethereum.isMetaMask;
}

function hasCoinbase() {
  if (!window.ethereum) return false;

  if (window.ethereum.providers) {
    return window.ethereum.providers.some((provider) => provider.isCoinbaseWallet);
  }

  return window.ethereum.isCoinbaseWallet;
}

function hasNami() {
  if (!window.cardano) return false;

  return Boolean(window.cardano.nami);
}

function hasFlint() {
  if (!window.cardano) return false;

  return Boolean(window.cardano.flint);
}

function hasProvider(providerName) {
  switch (providerName) {
    case METAMASK:
      return hasMetamask();
    case COINBASE:
      return hasCoinbase();
    case NAMI:
      return hasNami();
    case FLINT:
      return hasFlint();
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

function getNami() {
  return window.cardano.nami.enable();
}

function getFlint() {
  return window.cardano.flint.enable();
}

function getProvider(providerName) {
  switch (providerName) {
    case METAMASK:
      return getMetamask();
    case COINBASE:
      return getCoinbase();
    case NAMI:
      return getNami();
    case FLINT:
      return getFlint();
    default:
      return null;
  }
}

function getLibrary(name) {
  switch (name) {
    case METAMASK:
      return new EthereumLibrary(METAMASK);
    case COINBASE:
      return new EthereumLibrary(COINBASE);
    case NAMI:
      return new CardanoLibrary(NAMI);
    case FLINT:
      return new CardanoLibrary(FLINT);
  }
}

export { getProvider, hasProvider, getLibrary };
