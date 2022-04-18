window.config = {
  proxyAPI: 'http://localhost:8080',
  supportedChains: [
    {
      chainId: 189985,
      chainName: 'Ganache 1',
      nativeCurrency: {
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['http://localhost:7545'],
      transferName: 'ganache1',
      gatewayAddress: '0x2aF86BFD8eC3e759ff502882601ecA5C6513660C',
      iconSrc: '/images/eth.png',
      tokens: [
        {
          name: 'SISU Coin',
          address: '0x3A84fBbeFD21D6a5ce79D54d348344EE11EBd45C',
          symbol: 'SISU',
          decimals: 18,
          iconSrc: '/images/sisu.png',
        },
        {
          name: 'Test Token1',
          address: '0x4FF275a07A9a7Aea66Bef2971B826058635b32Ac',
          symbol: 'TEST1',
          decimals: 18,
          iconSrc: '/images/sisu.png',
        },
        {
          name: 'Test Token2',
          address: '0x13D474f19059896657A1633B8735108Ec1D8C32a',
          symbol: 'TEST2',
          decimals: 18,
          iconSrc: '/images/sisu.png',
        },
        {
          name: 'Test Token3',
          address: '0xb395e4453fbEC95c5FA43917A2ED2B05f93Ac9C6',
          symbol: 'TEST3',
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
      rpcUrls: ['http://localhost:8545'],
      transferName: 'ganache2',
      gatewayAddress: '0x2aF86BFD8eC3e759ff502882601ecA5C6513660C',
      iconSrc: '/images/eth.png',
      tokens: [
        {
          name: 'SISU Coin',
          address: '0x3A84fBbeFD21D6a5ce79D54d348344EE11EBd45C',
          symbol: 'SISU',
          decimals: 18,
          iconSrc: '/images/sisu.png',
        },
        {
          name: 'Test Token1',
          address: '0x4FF275a07A9a7Aea66Bef2971B826058635b32Ac',
          symbol: 'TEST1',
          decimals: 18,
          iconSrc: '/images/sisu.png',
        },
        {
          name: 'Test Token2',
          address: '0x13D474f19059896657A1633B8735108Ec1D8C32a',
          symbol: 'TEST2',
          decimals: 18,
          iconSrc: '/images/sisu.png',
        },
        {
          name: 'Test Token3',
          address: '0xb395e4453fbEC95c5FA43917A2ED2B05f93Ac9C6',
          symbol: 'TEST3',
          decimals: 18,
          iconSrc: '/images/sisu.png',
        },
      ],
    },
  ],
};
