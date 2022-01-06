import { ethers } from 'ethers';

function shortenString(str, startLength = 6, endLenth = 4) {
  return str.substring(0, startLength) + '...' + str.substring(str.length - endLenth);
}

export function shortenAddress(address) {
  if (!address) {
    return;
  }

  try {
    const formattedAddress = ethers.utils.getAddress(address);
    return shortenString(formattedAddress);
  } catch {
    throw new TypeError('Invalid address');
  }
}

export function shortenBalance(balance) {
  if (!balance) {
    return;
  }

  return parseFloat(balance).toFixed(4);
}
