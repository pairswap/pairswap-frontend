import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';

import SampleERC20 from 'abis/SampleERC20.json';
import ERC20Gateway from 'abis/ERC20Gateway.json';
import {
  converNumberToHexString,
  convertBigNumberToString,
  convertHexStringToNumber,
  convertHexStringToString,
} from 'utils/transform';
import { getProvider } from 'utils/provider';

class EthereumLibrary {
  provider;

  constructor(name) {
    this.name = name;
  }

  async init() {
    this.provider = getProvider(this.name);
    this.allowance = parseEther('1000000000'); // 1 * 10^9 * 10*18
  }

  async connect() {
    try {
      await this.provider.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      throw error;
    }
  }

  async getBalance(account) {
    try {
      const balance = await this.provider.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
      return convertHexStringToString(balance);
    } catch (error) {
      throw error;
    }
  }

  async getTokenBalance({ account, tokenAddress }) {
    try {
      const web3Provider = new Web3Provider(this.provider, 'any');
      const contract = new Contract(tokenAddress, SampleERC20.abi, web3Provider);
      const balance = await contract.balanceOf(account);

      return convertBigNumberToString(balance);
    } catch (error) {
      throw error;
    }
  }

  async getAccount() {
    try {
      const [account] = await this.provider.request({ method: 'eth_accounts' });
      return account;
    } catch (error) {
      throw error;
    }
  }

  async getChainId() {
    try {
      const chainId = await this.provider.request({ method: 'eth_chainId' });
      return convertHexStringToNumber(chainId);
    } catch (error) {
      throw error;
    }
  }

  addChain({ id, name, nativeCurrency, rpcs, explorers }) {
    return this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: converNumberToHexString(id),
          chainName: name,
          nativeCurrency,
          rpcUrls: rpcs,
          blockExplorerUrls: explorers,
        },
      ],
    });
  }

  changeChain({ id }) {
    return this.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: converNumberToHexString(id) }],
    });
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

  async transfer({ gatewayAddress, account, destChain, tokenOut, tokenIn, amount }) {
    try {
      const web3Provider = new Web3Provider(this.provider, 'any');
      const signer = web3Provider.getSigner(account);
      const contract = new Contract(gatewayAddress, ERC20Gateway.abi, signer);
      const tx = contract.transferOut(destChain, account, tokenOut, tokenIn, amount);
      return tx.hash;
    } catch (error) {
      throw error;
    }
  }
}

export default EthereumLibrary;
