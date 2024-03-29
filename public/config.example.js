window.config = {
  isUpdating: false,
  proxyAPI: 'https://be.talon-1.network',
  faucetURL: 'https://faucet.ko.exchange',
  tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY', 'ADA'],
  tokenInfos: {
    TIGER: {
      symbol: 'TIGER',
      name: 'Tiger Token',
      decimals: 18,
      icon: '/images/tiger.png',
      chains: [
        'polygon-testnet',
        'binance-testnet',
        'fantom-testnet',
        'avaxc-testnet',
        'cardano-testnet',
        'goerli-testnet',
      ],
      addresses: {
        'polygon-testnet': '0xe5216e1f485a209aaf5d8ffd36e9e499f1fddfa9',
        'binance-testnet': '0xeae73c6e2ed79231a238230a2a1967e96ae2708b',
        'fantom-testnet': '0x8e00081e4a6f68e554b470908c4f6758bec144d2',
        'avaxc-testnet': '0x7a23568c583483e9f7e13ae34a533a01d76213b9',
        'cardano-testnet': 'ccf1a53e157a7277e717045578a6e9834405730be0b778fd0daab794:uTIGER',
        'goerli-testnet': '0x1537Ed04fA536D2098cC4e319dF5218DF442f188',
      },
    },
    KANGAROO: {
      symbol: 'KANGAROO',
      name: 'Kangaroo Token',
      decimals: 18,
      icon: '/images/kangooro.png',
      chains: [
        'polygon-testnet',
        'binance-testnet',
        'fantom-testnet',
        'avaxc-testnet',
        'cardano-testnet',
        'goerli-testnet',
      ],
      addresses: {
        'polygon-testnet': '0x85463e352d14c9087c69cd700322554e5c06831b',
        'binance-testnet': '0x0415c3f9078525cf448b647d1f4370c81968a38c',
        'fantom-testnet': '0xcb96ebfb38e8e6f998f981f864666c608fa2eea6',
        'avaxc-testnet': '0xd876383cda551b5d6159f0fa7805b04db1eaaf57',
        'cardano-testnet': 'ccf1a53e157a7277e717045578a6e9834405730be0b778fd0daab794:uKANGAROO',
        'goerli-testnet': '0x6Fd1d4A852946E6526deDe229961e4Fda4DC7b5B',
      },
    },
    MOUSE: {
      symbol: 'MOUSE',
      name: 'Mouse Token',
      decimals: 18,
      icon: '/images/mouse.png',
      chains: [
        'polygon-testnet',
        'binance-testnet',
        'fantom-testnet',
        'avaxc-testnet',
        'cardano-testnet',
        'goerli-testnet',
      ],
      addresses: {
        'polygon-testnet': '0xc392c9239da4079c777cf9074e42543eb47a6545',
        'binance-testnet': '0x1ee9a5d2546718958d2e3f5a252e320f03621dfe',
        'fantom-testnet': '0xd47af82eb8b7209cc2dace94856d83492b9ed0fe',
        'avaxc-testnet': '0x1537ed04fa536d2098cc4e319df5218df442f188',
        'cardano-testnet': 'ccf1a53e157a7277e717045578a6e9834405730be0b778fd0daab794:uMOUSE',
        'goerli-testnet': '0x8Ea0442D850B9ed11264F16A05507bcE11dC8Fba',
      },
    },
    MONKEY: {
      symbol: 'MONKEY',
      name: 'Monkey Token',
      decimals: 18,
      icon: '/images/monkey.png',
      chains: [
        'polygon-testnet',
        'binance-testnet',
        'fantom-testnet',
        'avaxc-testnet',
        'cardano-testnet',
        'goerli-testnet',
      ],
      addresses: {
        'polygon-testnet': '0xfef1b365e7b4260406421c29b5f4c4c8621473d1',
        'binance-testnet': '0x64e668b1ae7f67858d270879d5a6dc9d86e6e162',
        'fantom-testnet': '0x7a31ac89bcdeb78a1de360a87e8041b48b5c3490',
        'avaxc-testnet': '0x6fd1d4a852946e6526dede229961e4fda4dc7b5b',
        'cardano-testnet': 'ccf1a53e157a7277e717045578a6e9834405730be0b778fd0daab794:uMONKEY',
        'goerli-testnet': '0x8E00081e4A6F68e554b470908c4f6758bEc144d2',
      },
    },
    BUNNY: {
      symbol: 'BUNNY',
      name: 'Bunny Token',
      decimals: 18,
      icon: '/images/bunny.png',
      chains: [
        'polygon-testnet',
        'binance-testnet',
        'fantom-testnet',
        'avaxc-testnet',
        'cardano-testnet',
        'goerli-testnet',
      ],
      addresses: {
        'polygon-testnet': '0x3a216d9f8e39349e30c9e5619c38addb43baf70c',
        'binance-testnet': '0x8d39809294c4130b1a5bf0476601b6912d57aba4',
        'fantom-testnet': '0x3f58ce2efb053cba709ce526e01a727513ab985c',
        'avaxc-testnet': '0x8ea0442d850b9ed11264f16a05507bce11dc8fba',
        'cardano-testnet': 'ccf1a53e157a7277e717045578a6e9834405730be0b778fd0daab794:uBUNNY',
        'goerli-testnet': '0xcb96eBFB38E8E6f998f981f864666C608fa2Eea6',
      },
    },
    ADA: {
      symbol: 'ADA',
      name: 'ADA',
      decimals: 18,
      icon: '/images/ada.png',
      chains: [
        'polygon-testnet',
        'binance-testnet',
        'fantom-testnet',
        'avaxc-testnet',
        'cardano-testnet',
        'goerli-testnet',
      ],
      addresses: {
        'polygon-testnet': '0x895ea49304d0365e71375d5125728ccb593b2812',
        'binance-testnet': '0x082c111286c778835fd09ea3c80115c2dc744cc4',
        'fantom-testnet': '0x37df5bf01ef8512e875a292813aab5b62ddd9e05',
        'avaxc-testnet': '0x8e00081e4a6f68e554b470908c4f6758bec144d2',
        'cardano-testnet': 'ccf1a53e157a7277e717045578a6e9834405730be0b778fd0daab794:uADA',
        'goerli-testnet': '0xD47AF82eb8B7209cc2dAcE94856D83492b9ed0FE',
      },
    },
  },
  chainInfos: {
    'polygon-testnet': {
      id: 80001,
      chainId: 80001,
      name: 'Polygon Testnet',
      rpcs: ['https://rpc.ankr.com/polygon_mumbai'],
      explorers: ['https://mumbai.polygonscan.com'],
      vaultAddress: '0x8425b9fa5ecaf26507b7682f10852d568c959b7e',
      icon: '/images/matic.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY', 'ADA'],
      nativeCurrency: {
        symbol: 'MATIC',
        decimals: 18,
      },
    },
    'binance-testnet': {
      id: 97,
      chainId: 97,
      name: 'BSC Testnet',
      rpcs: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
      explorers: ['https://testnet.bscscan.com'],
      vaultAddress: '0xa19264daa5475533e80e076d171c484b831abd63',
      icon: '/images/bnb.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY', 'ADA'],
      nativeCurrency: {
        symbol: 'BNB',
        decimals: 18,
      },
    },
    'fantom-testnet': {
      id: 4002,
      chainId: 4002,
      name: 'Fantom Testnet',
      rpcs: ['https://rpc.testnet.fantom.network'],
      explorers: ['https://testnet.ftmscan.com'],
      vaultAddress: '0x3791254a5c767062260166a8c20bcf1da60b77db',
      icon: '/images/ftm.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY', 'ADA'],
      nativeCurrency: {
        symbol: 'FTM',
        decimals: 18,
      },
    },
    'avaxc-testnet': {
      id: 43113,
      chainId: 43113,
      name: 'Avalanche Testnet',
      rpcs: ['https://api.avax-test.network/ext/bc/C/rpc'],
      explorers: ['https://testnet.snowtrace.io'],
      vaultAddress: '0x87888da90936e43cbf0d3a4e0583a9940e90417a',
      icon: '/images/avax.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY', 'ADA'],
      nativeCurrency: {
        symbol: 'AVAX',
        decimals: 18,
      },
    },
    'goerli-testnet': {
      id: 5,
      chainId: 5,
      name: 'ETH Testnet',
      rpcs: ['https://eth-goerli.g.alchemy.com/v2/pGJKcURlAHmDxtUpMiadca2g84cKzRBu'],
      explorers: ['https://goerli.etherscan.io'],
      vaultAddress: '0xd876383cda551b5d6159f0fa7805b04db1eaaf57',
      icon: '/images/eth.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY', 'ADA'],
      nativeCurrency: {
        symbol: 'ETH',
        decimals: 18,
      },
    },
    'cardano-testnet': {
      id: 98723843487,
      chainId: 0,
      /* disabled: true, */
      name: 'Cardano Testnet',
      explorers: ['https://testnet.cardanoscan.io'],
      vaultAddress: 'addr_test1vpycssylcger38ewu7xppg6sjc4yytjfcslxaqfxenyvw5suaxt23',
      icon: '/images/ada.png',
      type: 'cardano',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY'],
      nativeCurrency: {
        symbol: 'ADA',
        decimals: 18,
      },
    },
  },
};
