import combineStrings from '../combineStrings';

test('combineStrings', () => {
  expect(combineStrings('1', [0 < 1, '1', '0'], '2')).toEqual('1 1 2');
  expect(combineStrings([0 > 1, '1', '0'], [0 < 1, '1', '0'])).toEqual('0 1');
  expect(combineStrings('1', [0 > 1, '1'])).toEqual('1');
  expect(combineStrings('1', '', '', '2')).toEqual('1 2');
  expect(combineStrings('', '1', '   ', '2')).toEqual('1 2');
  expect(combineStrings('   ', [0 < 1, '1', '0'], '  ', '1')).toEqual('1 1');
  expect(combineStrings('1', undefined, '')).toEqual('1');

  // Unexpected cases
  // @ts-expect-error testing invalid type
  expect(() => combineStrings([0 < 1, 2])).toThrow('Unexpected case: arg 1 in combineStrings');
  // @ts-expect-error testing invalid type
  expect(() => combineStrings([0 < 1])).toThrow('Unexpected case: arg 1 in combineStrings');
  expect(() => combineStrings('', [0 < 1, '', ''], '')).toThrow('Unexpected case: arg 2 in combineStrings');
  expect(() => combineStrings([0 < 1, '', '2'])).toThrow('Unexpected case: arg 1 in combineStrings');
  // @ts-expect-error testing invalid type
  expect(() => combineStrings(null, undefined)).toThrow('Unexpected case: arg 1 in combineStrings');
  // @ts-expect-error testing invalid type
  expect(() => combineStrings(1)).toThrow('Unexpected case: arg 1 in combineStrings');
  // @ts-expect-error testing invalid type
  expect(() => combineStrings(Symbol)).toThrow('Unexpected case: arg 1 in combineStrings');
});
