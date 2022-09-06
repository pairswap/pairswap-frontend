window.config = {
  proxyAPI: 'https://be.talon-1.network',
  faucetURL: 'https://faucet.ko.exchange',
  tokens: ['SISU', 'ADA'],
  tokenInfos: {
    SISU: {
      symbol: 'SISU',
      name: 'Sisu Token',
      decimals: 18,
      icon: '/images/eth.png',
      chains: ['ganache1', 'ganache2'],
      addresses: {
        ganache1: '0xf0d676183dd5ae6b370adddbe770235f23546f9d',
        ganache2: '0xf0d676183dd5ae6b370adddbe770235f23546f9d',
      },
    },
    ADA: {
      symbol: 'ADA',
      name: 'Ada Token',
      decimals: 18,
      icon: '/images/ada.png',
      chains: ['ganache1', 'ganache2', 'cardano-testnet'],
      addresses: {
        ganache1: '0x3deace7e9c8b6ee632bb71663315d6330914f915',
        ganache2: '0x3deace7e9c8b6ee632bb71663315d6330914f915',
        'cardano-testnet': 'dc89700b3adf88f6b520aba2f3cfa4c26fa7a19bd8eadf430d73b9d4:WRAP_ADA',
      },
    },
  },
  chainInfos: {
    ganache1: {
      id: 189985,
      name: 'Ganache 1',
      rpcs: ['http://localhost:7545'],
      explorers: [],
      vaultAddress: '0x3a84fbbefd21d6a5ce79d54d348344ee11ebd45c',
      icon: '/images/eth.png',
      type: 'ethereum',
      tokens: ['SISU', 'ADA'],
      nativeCurrency: {
        symbol: 'ETH',
        decimals: 18,
      },
    },
    ganache2: {
      id: 189986,
      name: 'Ganache 2',
      rpcs: ['http://localhost:8545'],
      explorers: [],
      vaultAddress: '0x3a84fbbefd21d6a5ce79d54d348344ee11ebd45c',
      icon: '/images/eth.png',
      type: 'ethereum',
      tokens: ['SISU', 'ADA'],
      nativeCurrency: {
        symbol: 'ETH',
        decimals: 18,
      },
    },
    'cardano-testnet': {
      id: 0,
      name: 'Cardano Testnet',
      explorers: ['https://testnet.cardanoscan.io'],
      vaultAddress: 'addr_test1vp62cygk6www3uzuyelju4eurmyhqy5jm95sm73tnhq06wcttfrev',
      icon: '/images/ada.png',
      type: 'cardano',
      tokens: ['SISU', 'ADA'],
      nativeCurrency: {
        symbol: 'ADA',
        decimals: 18,
      },
    },
  },
};
