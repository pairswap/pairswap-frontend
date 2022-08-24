import { BigNumber } from '@ethersproject/bignumber';
import { hexValue } from '@ethersproject/bytes';

export function shortenAccount(account, startLength = 6, endLength = 4) {
  if (!account) {
    return;
  }

  const startStr = account.substring(0, startLength);
  const endStr = account.substring(account.length - endLength);
  return startStr + '...' + endStr;
}

export function shortenHash(hash, startLength = 10, endLength = 6) {
  if (!hash) {
    return;
  }

  const startStr = hash.substring(0, startLength);
  const endStr = hash.substring(hash.length - endLength);
  return startStr + '...' + endStr;
}

export function shortenBalance(balance, length = 4) {
  if (!balance) {
    return;
  }

  const exponent = 10 ** length;

  return Math.floor(Number(balance) * exponent) / exponent;
}

export function formatDate(date) {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, '0');
  const MM = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');

  return `${dd}/${MM}/${yyyy} ${hh}:${mm}`;
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

export function convertNumberToString(num, exponent = 18) {
  return convertBigNumberToString(BigNumber.from(`${num}`), exponent);
}
