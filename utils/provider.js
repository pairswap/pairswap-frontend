import { METAMASK, COINBASE, NAMI, ETERNL, TYPHON, PHANTOM } from 'constants/wallet';
import EthereumLibrary from 'request/ethereum';
import CardanoLibrary from 'request/cardano';
import SolanaLibrary from 'request/solana';

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

function hasEternl() {
  if (!window.cardano) return false;

  return Boolean(window.cardano.eternl);
}

function hasTyphon() {
  if (!window.cardano) return false;

  return Boolean(window.cardano.typhon);
}

function hasPhantom() {
  if (!window.phantom) return false;

  return Boolean(window.phantom?.solana?.isPhantom);
}

function hasProvider(providerName) {
  switch (providerName) {
    case METAMASK:
      return hasMetamask();
    case COINBASE:
      return hasCoinbase();
    case NAMI:
      return hasNami();
    case ETERNL:
      return hasEternl();
    case TYPHON:
      return hasTyphon();
    case PHANTOM:
      return hasPhantom();
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

function getEternl() {
  return window.cardano.eternl.enable();
}

async function getTyphon() {
  return window.cardano.typhoncip30.enable();
}

function getPhantom() {
  return window.phantom.solana;
}

function getProvider(providerName) {
  switch (providerName) {
    case METAMASK:
      return getMetamask();
    case COINBASE:
      return getCoinbase();
    case NAMI:
      return getNami();
    case ETERNL:
      return getEternl();
    case TYPHON:
      return getTyphon();
    case PHANTOM:
      return getPhantom();
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
    case ETERNL:
      return new CardanoLibrary(ETERNL);
    case TYPHON:
      return new CardanoLibrary(TYPHON);
    case PHANTOM:
      return new SolanaLibrary(PHANTOM);
  }
}

export { getProvider, hasProvider, getLibrary };
