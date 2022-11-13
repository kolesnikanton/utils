import { isArray, isNestedArray, wrapArr } from './utils';

export default function exp(arr, depth = 0) {
  if (!isArray(arr)) {
    throw new Error('Wrong. It`s not an array');
  }

  if (isNestedArray(arr)) {
    return exp(arr[0], depth + 1);
  }

  const res = arr.map(el => {
    if (isArray(el)) {
      return el.map(jEl => Math.exp(jEl));
    }

    return Math.exp(el);
  });

  return wrapArr(res, depth);
}
