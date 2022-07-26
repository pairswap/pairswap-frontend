export const ETHEREUM = 'ethereum';
export const CARDANO = 'cardano';

export const METAMASK = 'metamask';
export const COINBASE = 'coinbase';
export const NAMI = 'nami';
export const FLINT = 'flint';

export const WALLETS = {
  [ETHEREUM]: [METAMASK, COINBASE],
  [CARDANO]: [NAMI, FLINT],
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
  [FLINT]: {
    name: 'Flint',
    icon: '/images/flint.png',
  },
};
