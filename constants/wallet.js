export const ETHEREUM = 'ethereum';
export const CARDANO = 'cardano';
export const SOLANA = 'solana';

export const METAMASK = 'metamask';
export const COINBASE = 'coinbase';
export const NAMI = 'nami';
export const ETERNL = 'eternl';
export const TYPHON = 'typhon';
export const PHANTOM = 'phantom';

export const WALLETS = {
  [ETHEREUM]: [METAMASK, COINBASE],
  [CARDANO]: [NAMI, ETERNL, TYPHON],
  [SOLANA]: [PHANTOM],
};

export const WALLET_INFOS = {
  [METAMASK]: {
    name: 'Metamask',
    icon: '/images/metamask.png',
  },
  [COINBASE]: {
    name: 'Coinbase',
    icon: '/images/coinbase.png',
  },
  [NAMI]: {
    name: 'Nami',
    icon: '/images/nami.png',
  },
  [ETERNL]: {
    name: 'Eternl',
    icon: '/images/eternl.png',
  },
  [TYPHON]: {
    name: 'Typhon',
    icon: '/images/typhon.png',
  },
  [PHANTOM]: {
    name: 'Phantom',
    icon: '/images/phantom.png',
  },
};
