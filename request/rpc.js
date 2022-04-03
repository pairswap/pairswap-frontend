import { BigNumber } from '@ethersproject/bignumber';
import { parseEther } from '@ethersproject/units';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import SampleERC20 from 'abis/SampleERC20.json';
import ERC20Gateway from 'abis/ERC20Gateway.json';
import { converNumberToHexString } from 'utils/transform';

// 1 * 10^9 * 10*18
const allowance = parseEther('1000000000');

let provider = null;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  provider = new Web3Provider(window.ethereum, 'any');
}

export function getBalance(account) {
  return ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] });
}

export function requestAccounts() {
  return ethereum.request({ method: 'eth_requestAccounts' });
}

export function getAccounts() {
  return ethereum.request({ method: 'eth_accounts' });
}

export function getChainId() {
  return ethereum.request({ method: 'eth_chainId' });
}

export function addChain({ chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls }) {
  return ethereum.request({
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

export function changeChain({ chainId }) {
  return ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: converNumberToHexString(chainId) }],
  });
}

export function getCurrentAllowance({ gatewayAddress, tokenAddress, account }) {
  const contract = new Contract(tokenAddress, SampleERC20.abi, provider);

  return contract.allowance(account, gatewayAddress);
}

export async function checkApproval({ gatewayAddress, tokenAddress, account }) {
  const currentAllowance = await getCurrentAllowance({
    gatewayAddress,
    tokenAddress,
    account,
  });

  return currentAllowance.gt(BigNumber.from('0'));
}

export function approve({ gatewayAddress, tokenAddress, account }) {
  const signer = provider.getSigner(account);

  const contract = new Contract(tokenAddress, SampleERC20.abi, signer);

  return contract.approve(gatewayAddress, allowance);
}

export function getTokenBalance({ account, tokenAddress }) {
  const contract = new Contract(tokenAddress, SampleERC20.abi, provider);

  return contract.balanceOf(account);
}

export function transfer({ gatewayAddress, recipient, destChain, tokenOut, tokenIn, amount }) {
  const signer = provider.getSigner(recipient);
  const contract = new Contract(gatewayAddress, ERC20Gateway.abi, signer);

  return contract.transferOut(destChain, recipient, tokenOut, tokenIn, amount);
}
