import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';

import SampleERC20 from 'abis/SampleERC20.json';
import Vault from 'abis/Vault.json';
import {
  converNumberToHexString,
  convertBigNumberToString,
  convertHexStringToNumber,
  convertHexStringToString,
  convertStringToBigNumber,
} from 'utils/transform';
import { getProvider } from 'utils/provider';

class EthereumLibrary {
  provider;
  isEnabled;

  constructor(name) {
    this.name = name;
  }

  async init() {
    this.provider = getProvider(this.name);
    this.allowance = parseEther('1000000000'); // 1 * 10^9 * 10*18
    this.isEnabled = await this.enable();
  }

  async enable() {
    try {
      const [account] = await this.provider.request({ method: 'eth_accounts' });

      return account ? true : false;
    } catch (error) {
      return false;
    }
  }

  async connect() {
    try {
      await this.provider.request({ method: 'eth_requestAccounts' });
      this.isEnabled = true;
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

  async getTokenBalance({ account, tokenAddress, rpcUrl, chainId }) {
    try {
      const provider = new JsonRpcProvider(rpcUrl, chainId);
      const contract = new Contract(tokenAddress, SampleERC20, provider);

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

  addChain({ chainId, name, nativeCurrency, rpcs, explorers }) {
    return this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: converNumberToHexString(chainId),
          chainName: name,
          nativeCurrency,
          rpcUrls: rpcs,
          blockExplorerUrls: explorers,
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

  getCurrentAllowance({ vaultAddress, tokenAddress, account }) {
    const web3Provider = new Web3Provider(this.provider, 'any');
    const contract = new Contract(tokenAddress, SampleERC20, web3Provider);

    return contract.allowance(account, vaultAddress);
  }

  async checkApproval({ vaultAddress, tokenAddress, account }) {
    const currentAllowance = await this.getCurrentAllowance({
      vaultAddress,
      tokenAddress,
      account,
    });

    return currentAllowance.gt(BigNumber.from('0'));
  }

  approve({ vaultAddress, tokenAddress, account }) {
    const web3Provider = new Web3Provider(this.provider, 'any');
    const signer = web3Provider.getSigner(account);
    const contract = new Contract(tokenAddress, SampleERC20, signer);

    return contract.approve(vaultAddress, this.allowance);
  }

  async transfer({ account, recipient, isSameChainType, srcToken, amount }) {
    const { id, vaultAddress } = chainInfo;
    const bignumberAmount = convertStringToBigNumber(amount.toString());

    try {
      const web3Provider = new Web3Provider(this.provider, 'any');
      const signer = web3Provider.getSigner(account);
      const contract = new Contract(vaultAddress, Vault, signer);

      if (isSameChainType) {
        const tx = await contract.transferOut(srcToken, id, recipient, bignumberAmount);
        return tx.hash;
      } else {
        const tx = await contract.transferOutNonEvm(srcToken, id, recipient, bignumberAmount);
        return tx.hash;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default EthereumLibrary;
