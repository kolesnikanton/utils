import { isArray, isNestedArray, wrapArr } from './utils';
import { ArrayT } from '../types';

export default function exp(arr: ArrayT, depth = 0): ArrayT {
  if (!isArray(arr)) {
    throw new Error('Wrong. It`s not an array');
  }

  if (isNestedArray(arr)) {
    return exp(arr[0] as number[], depth + 1);
  }

  const res = arr.map(el => {
    if (isArray(el)) {
      return (el as number[]).map(jEl => Math.exp(jEl));
    }

    return Math.exp(el as number);
  });

  return wrapArr(res as ArrayT, depth) as ArrayT;
}
