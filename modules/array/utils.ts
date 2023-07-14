import { VALUE_TYPES } from '../_constants';
import getValueType from '../getValueType';
import { ArrayT } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArray(arr: any): boolean {
  return Array.isArray(arr);
}

export function isNestedArray(arr: ArrayT): boolean {
  return arr.length === 1 && isArray(arr[0]);
}

export function wrapArr(arr: ArrayT, n?: number, i = 0): ArrayT {
  if (getValueType(n) !== VALUE_TYPES.number) {
    return arr;
  }

  if (i !== n) {
    return wrapArr([arr] as ArrayT, n, i + 1);
  }

  return arr;
}
