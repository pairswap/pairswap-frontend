const supportedChains = [
  // {
  //   chainId: 3,
  //   chainName: 'ETH testnet',
  //   nativeCurrency: {
  //     symbol: 'ETH',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://ropsten.infura.io/v3/92c84d95a1ed4fd593009e4ac1d33b24'],
  //   blockExplorerUrls: ['https://ropsten.etherscan.io'],
  //   transferName: 'eth-ropsten',
  //   gatewayAddress: '0xF524fd11D40998bC54D73aD2a00a8A357aa18Fec',
  //   iconSrc: '/images/eth.png',
  //   tokens: [
  //     {
  //       name: 'SISU Coin',
  //       address: '0xbB71536222f2AE43f9818bf60067D270cA31dBB0',
  //       symbol: 'SISU',
  //       decimals: 18,
  //       iconSrc: '/images/sisu.png',
  //     },
  //   ],
  // },
  // {
  //   chainId: 97,
  //   chainName: 'BSC testnet',
  //   nativeCurrency: {
  //     symbol: 'BNB',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  //   blockExplorerUrls: ['https://testnet.bscscan.com'],
  //   transferName: 'eth-binance-testnet',
  //   gatewayAddress: '0xD1658825EB56CdbD0435f775001499770ea339f2',
  //   iconSrc: '/images/bnb.png',
  //   tokens: [
  //     {
  //       name: 'SISU Coin',
  //       address: '0x5a78061af3c66DF4d0d84570a74827C760B9956F',
  //       symbol: 'SISU',
  //       decimals: 18,
  //       iconSrc: '/images/sisu.png',
  //     },
  //   ],
  // },
  // {
  //   chainId: 80001,
  //   chainName: 'Polygon testnet',
  //   nativeCurrency: {
  //     symbol: 'MATIC',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://matic-testnet-archive-rpc.bwarelabs.com'],
  //   blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  //   transferName: 'polygon-testnet',
  //   gatewayAddress: '0xD1658825EB56CdbD0435f775001499770ea339f2',
  //   iconSrc: '/images/matic.png',
  //   tokens: [
  //     {
  //       name: 'SISU Coin',
  //       address: '0x0668cF685dbCd5B75BC35eD23ed6BCd6F6d22095',
  //       symbol: 'SISU',
  //       decimals: 18,
  //       iconSrc: '/images/sisu.png',
  //     },
  //   ],
  // },
  {
    chainId: 189985,
    chainName: 'Ganache 1',
    nativeCurrency: {
      symbol: 'ETH',
      decimals: 18,
    },
    // Metamask only add chain with https
    rpcUrls: ['https://lazy-wolverine-38.loca.lt'],
    transferName: 'ganache1',
    gatewayAddress: '0xAaf23BaFf633d492a1Da6e6dC78301CA80CaFa61',
    iconSrc: '/images/eth.png',
    tokens: [
      {
        name: 'SISU Coin',
        address: '0x3A84fBbeFD21D6a5ce79D54d348344EE11EBd45C',
        symbol: 'SISU',
        decimals: 18,
        iconSrc: '/images/sisu.png',
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
    rpcUrls: ['https://lucky-treefrog-49.loca.lt'],
    transferName: 'ganache2',
    gatewayAddress: '0xAaf23BaFf633d492a1Da6e6dC78301CA80CaFa61',
    iconSrc: '/images/eth.png',
    tokens: [
      {
        name: 'SISU Coin',
        address: '0x3A84fBbeFD21D6a5ce79D54d348344EE11EBd45C',
        symbol: 'SISU',
        decimals: 18,
        iconSrc: '/images/sisu.png',
      },
    ],
  },
];

export default supportedChains;
