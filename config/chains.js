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
    gatewayAddress: '0x7f7c85feA20425ff3bd74474309f46627B8B9A86',
    iconSrc: '/images/coins/eth.png',
    tokens: [
      {
        address: '0xfb9065ac47FF4a7D39415c714c2292BDCa111712',
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
    gatewayAddress: '0x7f7c85feA20425ff3bd74474309f46627B8B9A86',
    iconSrc: '/images/coins/bnb.png',
    tokens: [
      {
        address: '0x01d20BaDB1D225b20B7b44b09cD7ac84f7E7e84e',
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
    gatewayAddress: '0x09D3fCe60A867e6D8D1F53311686A201B3fa694d',
    iconSrc: '/images/coins/matic.png',
    tokens: [
      {
        address: '0x732a3E986D44622A6f91eCbb6d83dfbAbF172d97',
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
    gatewayAddress: '0x09D3fCe60A867e6D8D1F53311686A201B3fa694d',
    iconSrc: '/images/coins/eth.png',
    tokens: [
      {
        address: '0xC3803f12067134164BFCa0A63F43443a35bAb5aB',
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
    gatewayAddress: '0x09D3fCe60A867e6D8D1F53311686A201B3fa694d',
    iconSrc: '/images/coins/eth.png',
    tokens: [
      {
        address: '0x732a3E986D44622A6f91eCbb6d83dfbAbF172d97',
        symbol: 'SISU',
        decimals: 18,
        iconSrc: '/images/coins/sisu.png',
      },
    ],
  },
];

export default supportedChains;
