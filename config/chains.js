const supportedChains = [
  {
    chainId: 3,
    chainName: 'ETH testnet',
    nativeCurrency: {
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://ropsten.infura.io/v3/92c84d95a1ed4fd593009e4ac1d33b24'],
    transferName: 'eth-ropsten',
    gatewayAddress: '0xF524fd11D40998bC54D73aD2a00a8A357aa18Fec',
    iconSrc: '/images/coins/eth.png',
    tokens: [
      {
        address: '0xbB71536222f2AE43f9818bf60067D270cA31dBB0',
        symbol: 'SISU',
        decimals: 18,
        iconSrc: '/images/coins/sisu.png',
      },
    ],
  },
  {
    chainId: 97,
    chainName: 'BSC testnet',
    nativeCurrency: {
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    transferName: 'eth-binance-testnet',
    gatewayAddress: '0xD1658825EB56CdbD0435f775001499770ea339f2',
    iconSrc: '/images/coins/bnb.png',
    tokens: [
      {
        address: '0x5a78061af3c66DF4d0d84570a74827C760B9956F',
        symbol: 'SISU',
        decimals: 18,
        iconSrc: '/images/coins/sisu.png',
      },
    ],
  },
  {
    chainId: 80001,
    chainName: 'Polygon testnet',
    nativeCurrency: {
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://matic-testnet-archive-rpc.bwarelabs.com'],
    transferName: 'polygon-testnet',
    gatewayAddress: '0xD1658825EB56CdbD0435f775001499770ea339f2',
    iconSrc: '/images/coins/matic.png',
    tokens: [
      {
        address: '0x0668cF685dbCd5B75BC35eD23ed6BCd6F6d22095',
        symbol: 'SISU',
        decimals: 18,
        iconSrc: '/images/coins/sisu.png',
      },
    ],
  },
  {
    chainId: 189985,
    chainName: 'Ganache 1',
    nativeCurrency: {
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['http://localhost:7545'],
    transferName: 'ganache1',
    gatewayAddress: '0xD1658825EB56CdbD0435f775001499770ea339f2',
    iconSrc: '/images/coins/eth.png',
    tokens: [
      {
        address: '0x3DeaCe7E9C8b6ee632bb71663315d6330914f915',
        symbol: 'SISU',
        decimals: 18,
        iconSrc: '/images/coins/sisu.png',
      },
    ],
  },
  {
    chainId: 189986,
    chainName: 'Ganache 2',
    nativeCurrency: {
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['http://localhost:8545'],
    transferName: 'ganache2',
    gatewayAddress: '0xD1658825EB56CdbD0435f775001499770ea339f2',
    iconSrc: '/images/coins/eth.png',
    tokens: [
      {
        address: '0x3DeaCe7E9C8b6ee632bb71663315d6330914f915',
        symbol: 'SISU',
        decimals: 18,
        iconSrc: '/images/coins/sisu.png',
      },
    ],
  },
];

export default supportedChains;
