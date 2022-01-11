import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';

function shortenString(str, startLength = 6, endLenth = 4) {
  return str.substring(0, startLength) + '...' + str.substring(str.length - endLenth);
}

export function shortenAccount(address) {
  if (!address) {
    return;
  }

  try {
    const formattedAddress = getAddress(address);
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

export function convertDecimalsToBigNumber(number, decimals = 18) {
  const _split = number.split('.');

  const _interger = BigNumber.from(_split[0]).mul(BigNumber.from(10).pow(decimals));

  if (_split.length === 1) {
    return _interger;
  }

  const _decimals = BigNumber.from(_split[1]).mul(
    BigNumber.from(10).pow(decimals - _split[1].length)
  );

  return _interger.add(_decimals);
}
