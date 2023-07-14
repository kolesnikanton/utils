import isInt from '../isInt';

const mock = {
  emptyArr: [],
  emptyString: '',
  emptyObject: {},
  nan: NaN,
  zero: 0,
  floatNumber: 1.1,
  floatNumberWithZero: 3.000,
  undefined,
  null: null,
  class: class Test {},
  bigInt: BigInt(123),
  int: 123,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function: () => {},
  sybmol: Symbol('123'),
  arr: ['123'],
  object: { test: '123' },
  string: '123',
  false: false,
};

test('isInt', () => {
  expect(isInt(mock.zero)).toBe(true);
  expect(isInt(mock.int)).toBe(true);
  expect(isInt(mock.floatNumberWithZero)).toBe(true);

  expect(isInt(mock.floatNumber)).toBe(false);
  expect(isInt(mock.false)).toBe(false);
  expect(isInt(mock.bigInt)).toBe(false);
  expect(isInt(mock.function)).toBe(false);
  expect(isInt(mock.sybmol)).toBe(false);
  expect(isInt(mock.function)).toBe(false);
});
