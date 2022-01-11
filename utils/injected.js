import { hexValue } from '@ethersproject/bytes';

import { injected } from 'config/connectors';

export async function requestChangeChain(chainId) {
  try {
    const provider = await injected.getProvider();
    provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexValue(chainId) }],
    });
  } catch (error) {
    console.error(error);
  }
}
