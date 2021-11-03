import { VALUE_TYPES } from '../_constants';
import getValueType from '../getValueType';

const mock = {
  emptyArr: [],
  emptyString: '',
  emptyObject: {},
  zero: 0,
  undefined,
  null: null,
  class: class Test {},
  bigInt: BigInt(9007199254740991),
  function: () => {},
  sybmol: Symbol('test'),
  arr: ['test'],
  object: { test: 'test' },
  string: 'test',
};

it(`should return ${VALUE_TYPES.array}`, () => {
  expect(getValueType(mock.emptyArr)).toBe(VALUE_TYPES.array);
  expect(getValueType(mock.arr)).toBe(VALUE_TYPES.array);

  expect(getValueType(mock.emptyString)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.emptyObject)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.zero)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.undefined)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.null)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.class)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.bigInt)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.function)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.sybmol)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.object)).not.toBe(VALUE_TYPES.array);
  expect(getValueType(mock.string)).not.toBe(VALUE_TYPES.array);
});

it(`should return ${VALUE_TYPES.null}`, () => {
  expect(getValueType(mock.null)).toBe(VALUE_TYPES.null);

  expect(getValueType(mock.emptyArr)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.arr)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.emptyString)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.emptyObject)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.zero)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.undefined)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.class)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.bigInt)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.function)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.sybmol)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.object)).not.toBe(VALUE_TYPES.null);
  expect(getValueType(mock.string)).not.toBe(VALUE_TYPES.null);
});

it(`should return ${VALUE_TYPES.object}`, () => {
  expect(getValueType(mock.emptyObject)).toBe(VALUE_TYPES.object);
  expect(getValueType(mock.object)).toBe(VALUE_TYPES.object);

  expect(getValueType(mock.emptyArr)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.arr)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.emptyString)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.zero)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.undefined)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.class)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.bigInt)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.function)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.sybmol)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.null)).not.toBe(VALUE_TYPES.object);
  expect(getValueType(mock.string)).not.toBe(VALUE_TYPES.object);
});
