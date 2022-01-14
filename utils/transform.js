import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';

export function shortenAccount(account, startLength = 6, endLength = 4) {
  if (!account) {
    return;
  }

  try {
    const _account = getAddress(account);
    const startStr = _account.substring(0, startLength);
    const endStr = _account.substring(_account.length - endLength);
    return startStr + '...' + endStr;
  } catch {
    throw new TypeError('Invalid account format');
  }
}

export function shortenBalance(balance, length = 4) {
  if (!balance) {
    return;
  }

  const [, fraction] = balance.split('.');

  if (fraction && fraction.length < length) {
    return balance;
  }

  return parseFloat(balance).toFixed(length);
}

export function convertDecimalsToBigNumber(decimals, exponent = 18) {
  const [integer, fraction] = decimals.split('.');

  const bigInteger = BigNumber.from(integer).mul(BigNumber.from(10).pow(exponent));

  if (!fraction) {
    return bigInteger;
  }

  if (exponent >= fraction.length) {
    const bigFraction = BigNumber.from(fraction).mul(
      BigNumber.from(10).pow(exponent - fraction.length)
    );
    return bigInteger.add(bigFraction);
  } else {
    throw new RangeError(`The length of fractional part must less than ${exponent}`);
  }
}
