import get from '../get';

const mock = {
  emptyObject: {},
  defaultValue: 'default',
  objectWithValue: { test: 'test' },
  objWithUndefined: { test: undefined },
  objWithNull: { test: null },
  objWithEmptyString: { test: '' },
  objWithNaN: { test: NaN },
  objWithZero: { test: 0 },
  objWithEmptyArr: { test: [] },
  objWithFalse: { test: false },
};

it('should return an obj key value', () => {
  expect(get(mock.objectWithValue, 'test', mock.defaultValue)).toBe(mock.objectWithValue.test);
  expect(get(mock.objWithUndefined, 'test', mock.defaultValue)).toBe(mock.objWithUndefined.test);
  expect(get(mock.objWithNull, 'test', mock.defaultValue)).toBe(mock.objWithNull.test);
  expect(get(mock.objWithEmptyString, 'test', mock.defaultValue)).toBe(mock.objWithEmptyString.test);
  expect(get(mock.objWithNaN, 'test', mock.defaultValue)).toBe(mock.objWithNaN.test);
  expect(get(mock.objWithZero, 'test', mock.defaultValue)).toBe(mock.objWithZero.test);
  expect(get(mock.objWithEmptyArr, 'test', mock.defaultValue)).toBe(mock.objWithEmptyArr.test);
  expect(get(mock.objWithFalse, 'test', mock.defaultValue)).toBe(mock.objWithFalse.test);
});

it('should return a default value', () => {
  expect(get(mock.emptyObject, 'test', mock.defaultValue)).toBe(mock.defaultValue);
  expect(get(mock.objectWithValue, 'incorrectKey', mock.defaultValue)).toBe(mock.defaultValue);
});
