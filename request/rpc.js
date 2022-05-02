import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';

import SampleERC20 from 'abis/SampleERC20.json';
import ERC20Gateway from 'abis/ERC20Gateway.json';
import { converNumberToHexString } from 'utils/transform';

class RPCRequest {
  // 1 * 10^9 * 10*18
  allowance = parseEther('1000000000');
  provider;

  constructor(provider) {
    this.provider = provider;
  }

  getBalance(account) {
    return this.provider.request({ method: 'eth_getBalance', params: [account, 'latest'] });
  }

  requestAccounts() {
    return this.provider.request({ method: 'eth_requestAccounts' });
  }

  getAccounts() {
    return this.provider.request({ method: 'eth_accounts' });
  }

  getChainId() {
    return this.provider.request({ method: 'eth_chainId' });
  }

  addChain({ chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls }) {
    return this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: converNumberToHexString(chainId),
          chainName,
          nativeCurrency,
          rpcUrls,
          blockExplorerUrls,
        },
      ],
    });
  }

  changeChain({ chainId }) {
    return this.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: converNumberToHexString(chainId) }],
    });
  }

  getGatewayContract({ gatewayAddress, rpcUrls, chainId }) {
    const jsonRpcProvider = new JsonRpcProvider(rpcUrls[0], chainId);
    const contract = new Contract(gatewayAddress, ERC20Gateway.abi, jsonRpcProvider);

    return contract;
  }

  getCurrentAllowance({ gatewayAddress, tokenAddress, account }) {
    const web3Provider = new Web3Provider(this.provider, 'any');
    const contract = new Contract(tokenAddress, SampleERC20.abi, web3Provider);

    return contract.allowance(account, gatewayAddress);
  }

  async checkApproval({ gatewayAddress, tokenAddress, account }) {
    const currentAllowance = await this.getCurrentAllowance({
      gatewayAddress,
      tokenAddress,
      account,
    });

    return currentAllowance.gt(BigNumber.from('0'));
  }

  approve({ gatewayAddress, tokenAddress, account }) {
    const web3Provider = new Web3Provider(this.provider, 'any');
    const signer = web3Provider.getSigner(account);
    const contract = new Contract(tokenAddress, SampleERC20.abi, signer);

    return contract.approve(gatewayAddress, this.allowance);
  }

  getTokenBalance({ account, tokenAddress }) {
    const web3Provider = new Web3Provider(this.provider, 'any');
    const contract = new Contract(tokenAddress, SampleERC20.abi, web3Provider);

    return contract.balanceOf(account);
  }

  transfer({ gatewayAddress, recipient, destChain, tokenOut, tokenIn, amount }) {
    const web3Provider = new Web3Provider(this.provider, 'any');
    const signer = web3Provider.getSigner(recipient);
    const contract = new Contract(gatewayAddress, ERC20Gateway.abi, signer);

    return contract.transferOut(destChain, recipient, tokenOut, tokenIn, amount);
  }
}

export default RPCRequest;
