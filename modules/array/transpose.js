import getShape from './getShape';
import { isArray } from './utils';

export default function transpose(arr) {
  if (!isArray(arr)) {
    throw new Error('Wrong. It`s not an array');
  }

  const shape = getShape(arr);

  if (shape.col === 0) {
    return arr;
  }

  const result = [];

  for (let i = 0; i < shape.col; i++) {
    result[i] = [];

    for (let j = 0; j < shape.row; j++) {
      result[i][j] = arr[j][i];
    }
  }

  return result;
}
