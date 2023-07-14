import isEmpty from '../isEmpty';

const mock = {
  emptyArr: [],
  emptyString: '',
  emptyObject: {},
  nan: NaN,
  zero: 0,
  floatNumber: 1.1,
  undefined,
  null: null,
  class: class Test {},
  bigInt: BigInt(9007199254740991),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function: () => {},
  sybmol: Symbol('test'),
  arr: ['test'],
  object: { test: 'test' },
  string: 'test',
  false: false,
};

it('should check an array correctly', () => {
  expect(isEmpty(mock.emptyArr)).toBe(true);

  expect(isEmpty(mock.arr)).toBe(false);
});

it('should check a number correctly', () => {
  expect(isEmpty(mock.nan)).toBe(true);

  expect(isEmpty(mock.zero)).toBe(false);
  expect(isEmpty(mock.floatNumber)).toBe(false);
});

it('should check a string correctly', () => {
  expect(isEmpty(mock.emptyString)).toBe(true);

  expect(isEmpty(mock.string)).toBe(false);
});

it('should check an object correctly', () => {
  expect(isEmpty(mock.emptyObject)).toBe(true);

  expect(isEmpty(mock.object)).toBe(false);
  expect(isEmpty(mock.class)).toBe(false);
});

it('should check other types correctly', () => {
  expect(isEmpty(mock.undefined)).toBe(true);
  expect(isEmpty(mock.null)).toBe(true);

  expect(isEmpty(mock.false)).toBe(false);
  expect(isEmpty(mock.bigInt)).toBe(false);
  expect(isEmpty(mock.function)).toBe(false);
  expect(isEmpty(mock.sybmol)).toBe(false);
  expect(isEmpty(mock.function)).toBe(false);
});
