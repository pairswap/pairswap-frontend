import { Web3Provider } from '@ethersproject/providers';

const available = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
let metamaskProvider, web3Provider;

function getMetamaskProvider() {
  if (window.ethereum.providers) {
    return window.ethereum.providers.find((provider) => provider.isMetaMask);
  }

  return window.ethereum;
}

if (available) {
  metamaskProvider = getMetamaskProvider();
  web3Provider = new Web3Provider(metamaskProvider, 'any');
}

export { available, metamaskProvider, web3Provider };
