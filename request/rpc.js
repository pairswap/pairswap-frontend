import { BigNumber } from '@ethersproject/bignumber';
import { parseEther } from '@ethersproject/units';
import { Contract } from '@ethersproject/contracts';

import SampleERC20 from 'abis/SampleERC20.json';
import ERC20Gateway from 'abis/ERC20Gateway.json';
import { converNumberToHexString } from 'utils/transform';
import { metamaskProvider, web3Provider } from 'utils/provider';

// 1 * 10^9 * 10*18
const allowance = parseEther('1000000000');

export function getBalance(account) {
  return metamaskProvider.request({ method: 'eth_getBalance', params: [account, 'latest'] });
}

export function requestAccounts() {
  return metamaskProvider.request({ method: 'eth_requestAccounts' });
}

export function getAccounts() {
  return metamaskProvider.request({ method: 'eth_accounts' });
}

export function getChainId() {
  return metamaskProvider.request({ method: 'eth_chainId' });
}

export function addChain({ chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls }) {
  return metamaskProvider.request({
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
  return metamaskProvider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: converNumberToHexString(chainId) }],
  });
}

export function getCurrentAllowance({ gatewayAddress, tokenAddress, account }) {
  const contract = new Contract(tokenAddress, SampleERC20.abi, web3Provider);

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
  const signer = web3Provider.getSigner(account);

  const contract = new Contract(tokenAddress, SampleERC20.abi, signer);

  return contract.approve(gatewayAddress, allowance);
}

export function getTokenBalance({ account, tokenAddress }) {
  const contract = new Contract(tokenAddress, SampleERC20.abi, web3Provider);

  return contract.balanceOf(account);
}

export function transfer({ gatewayAddress, recipient, destChain, tokenOut, tokenIn, amount }) {
  const signer = web3Provider.getSigner(recipient);
  const contract = new Contract(gatewayAddress, ERC20Gateway.abi, signer);

  return contract.transferOut(destChain, recipient, tokenOut, tokenIn, amount);
}
