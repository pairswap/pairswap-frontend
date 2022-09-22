window.config = {
  isUpdating: false,
  proxyAPI: 'https://be.talon-1.network',
  faucetURL: 'https://faucet.ko.exchange',
  tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY'],
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
        'goerli-testnet',
        'cardano-testnet',
      ],
      addresses: {
        'polygon-testnet': '0xac55c3cc038eff0542757b00e9411cb4ff6b3110',
        'binance-testnet': '0x7682935bbf0069dcf0f4ae02f0c323d94c607a71',
        'fantom-testnet': '0x7682935bbf0069dcf0f4ae02f0c323d94c607a71',
        'avaxc-testnet': '0x77270e2ee97947172574ce1b47e94baf36d70b53',
        'goerli-testnet': '0xba4a21edb7d861b15c4e5af70259de3c736360e9',
        'cardano-testnet': '3071b9098636d9c5a3000f0185349901d0fa8b8333bee6799516390c:uTIGER',
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
        'goerli-testnet',
        'cardano-testnet',
      ],
      addresses: {
        'polygon-testnet': '0xdd6d9c2c237f374d6180311bb63e11175ac7bc14',
        'binance-testnet': '0xebe0a4aeff24371b6346f1077c2781907215ba36',
        'fantom-testnet': '0xebe0a4aeff24371b6346f1077c2781907215ba36',
        'avaxc-testnet': '0x7682935bbf0069dcf0f4ae02f0c323d94c607a71',
        'goerli-testnet': '0xeca5891480d194838a21ded0c19cae610cc52ee2',
        'cardano-testnet': '3071b9098636d9c5a3000f0185349901d0fa8b8333bee6799516390c:uKANGAROO',
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
        'goerli-testnet',
        'cardano-testnet',
      ],
      addresses: {
        'polygon-testnet': '0x04526e8f16ec64f6112ea2d4940edaf722d53da1',
        'binance-testnet': '0x37ee96f3c8708e9a5a2f41dbced985efefbfbf4f',
        'fantom-testnet': '0x37ee96f3c8708e9a5a2f41dbced985efefbfbf4f',
        'avaxc-testnet': '0xebe0a4aeff24371b6346f1077c2781907215ba36',
        'goerli-testnet': '0x9c712a9469edead9b6131608ca1cb0b4dbf5e7a7',
        'cardano-testnet': '3071b9098636d9c5a3000f0185349901d0fa8b8333bee6799516390c:uMOUSE',
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
        'goerli-testnet',
        'cardano-testnet',
      ],
      addresses: {
        'polygon-testnet': '0xe2653419a975486a251257fc02118836b02a5139',
        'binance-testnet': '0xe4654190540a206d04f7a59fd20a4863df706e0b',
        'fantom-testnet': '0xe4654190540a206d04f7a59fd20a4863df706e0b',
        'avaxc-testnet': '0x37ee96f3c8708e9a5a2f41dbced985efefbfbf4f',
        'goerli-testnet': '0xac55c3cc038eff0542757b00e9411cb4ff6b3110',
        'cardano-testnet': '3071b9098636d9c5a3000f0185349901d0fa8b8333bee6799516390c:uMONKEY',
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
        'goerli-testnet',
        'cardano-testnet',
      ],
      addresses: {
        'polygon-testnet': '0x3b3d21be04be422be6e124e768ce1b16a3d35fcc',
        'binance-testnet': '0x8b1e0f1af2c4d096b988126f85cf66a3a9e38f5e',
        'fantom-testnet': '0x8b1e0f1af2c4d096b988126f85cf66a3a9e38f5e',
        'avaxc-testnet': '0xe4654190540a206d04f7a59fd20a4863df706e0b',
        'goerli-testnet': '0xdd6d9c2c237f374d6180311bb63e11175ac7bc14',
        'cardano-testnet': '3071b9098636d9c5a3000f0185349901d0fa8b8333bee6799516390c:uBUNNY',
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
      vaultAddress: '0x303711cfe2c9bd11fc620c2bee71db26ac866130',
      icon: '/images/matic.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY'],
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
      vaultAddress: '0xbe7c4fd31f4dd945558b8e71641eaa044f71a599',
      icon: '/images/bnb.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY'],
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
      vaultAddress: '0xc0863a9941e320ece36e21d40f6b5fd06513a84b',
      icon: '/images/ftm.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY'],
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
      vaultAddress: '0xb7dac0d273c9c3c9a338d96c7ba2127446309944',
      icon: '/images/avax.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY'],
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
      vaultAddress: '0xd199600b2bc8f4e7c3f04e4f99623cd6a5b4b591',
      icon: '/images/eth.png',
      type: 'ethereum',
      tokens: ['TIGER', 'KANGAROO', 'MOUSE', 'MONKEY', 'BUNNY'],
      nativeCurrency: {
        symbol: 'ETH',
        decimals: 18,
      },
    },
    'cardano-testnet': {
      id: 98723843487,
      chainId: 0,
      name: 'Cardano Testnet',
      explorers: ['https://testnet.cardanoscan.io'],
      vaultAddress: 'addr_test1vrje4gac3k3am75htjv27a2c2rrs975fdwfa969z880n0lqrgp884',
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
