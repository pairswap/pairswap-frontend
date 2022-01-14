import { convertDecimalsToBigNumber, shortenAccount, shortenBalance } from 'utils/transform';

test('can shorten account', () => {
  expect(shortenAccount('0x1111000000000000000000000000000000001234')).toBe('0x1111...1234');
  expect(() => shortenAccount('0xabcd')).toThrow(TypeError('Invalid account format'));
});

test('can shorten balance', () => {
  expect(shortenBalance('0.0')).toBe('0.0');
  expect(shortenBalance('0.01235')).toBe('0.0123');
  expect(shortenBalance('0.01239')).toBe('0.0124');
  expect(shortenBalance('0.01235', 2)).toBe('0.01');
});

test('can convert decimals to BigNumber', () => {
  const trailingZero = (length) => '0'.repeat(length);

  expect(convertDecimalsToBigNumber('12').toString()).toBe(`12${trailingZero(18)}`);
  expect(convertDecimalsToBigNumber('12', 10).toString()).toBe(`12${trailingZero(10)}`);
  expect(convertDecimalsToBigNumber('12.5').toString()).toBe(`125${trailingZero(17)}`);
  expect(convertDecimalsToBigNumber('12.5', 10).toString()).toBe(`125${trailingZero(9)}`);
  expect(convertDecimalsToBigNumber('0.1255').toString()).toBe(`1255${trailingZero(14)}`);
  expect(convertDecimalsToBigNumber('0.1255', 10).toString()).toBe(`1255${trailingZero(6)}`);
  expect(convertDecimalsToBigNumber('0').toString()).toBe('0');
  expect(convertDecimalsToBigNumber('0', 10).toString()).toBe('0');
  expect(() => convertDecimalsToBigNumber('0.000000000000000000000000000000001')).toThrow(
    RangeError('The length of fractional part must less than 18')
  );
});
