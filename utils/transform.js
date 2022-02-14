import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { hexValue } from '@ethersproject/bytes';

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

export function convertStringToBigNumber(str, exponent = 18) {
  const [integer, fraction] = str.split('.');

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

export function convertBigNumberToString(bigNumber, exponent = 18) {
  const str = bigNumber.toString();

  let integer, fraction;

  if (str.length > exponent) {
    integer = str.slice(0, str.length - exponent);
    fraction = str.slice(str.length - exponent).replace(/0+$/, '');

    if (!fraction) {
      return integer;
    }

    return integer + '.' + fraction;
  } else {
    integer = 0;
    fraction = '0'.repeat(exponent - str.length) + str.replace(/0+$/, '');

    return integer + '.' + fraction;
  }
}

export function convertHexStringToString(hexString, exponent = 18) {
  const bigNumber = BigNumber.from(hexString);
  return convertBigNumberToString(bigNumber, exponent);
}

export function convertHexStringToNumber(hexString) {
  return BigNumber.from(hexString).toNumber();
}

export function converNumberToHexString(num) {
  return hexValue(num);
}
