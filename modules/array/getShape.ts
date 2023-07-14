import { isArray } from './utils';
import { ArrayT } from '../types';

export default function getShape(arr: ArrayT): { row: number, col: number } {
  let is1DArr = null;
  let row = 0;
  let col = 0;

  for (let i = 0; i < arr.length; i++) {
    if (isArray(arr[i])) {
      if (is1DArr) {
        throw new Error('Wrong depth');
      }

      const element = arr[i] as number[];

      if (i && col !== element.length) {
        throw new Error('Wrong column');
      }

      for (let j = 0; j < element.length; j++) {
        if (isArray(element[j])) {
          throw new Error('Wrong depth');
        }
      }

      is1DArr = false;
      col = element.length;
      row += 1;
    } else {
      if (is1DArr === false) {
        throw new Error('Wrong depth');
      }

      is1DArr = true;
      row += 1;
    }
  }

  return { row, col };
}
