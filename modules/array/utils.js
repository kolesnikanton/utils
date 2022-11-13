import { VALUE_TYPES } from '../_constants';
import getValueType from '../getValueType';

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isNestedArray(arr) {
  return arr.length === 1 && isArray(arr[0]);
}

export function wrapArr(arr, n, i = 0) {
  if (getValueType(n) !== VALUE_TYPES.number) {
    return arr;
  }

  if (i !== n) {
    return wrapArr([arr], n, i + 1);
  }

  return arr;
}
