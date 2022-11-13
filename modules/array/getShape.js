import { isArray } from './utils';

export default function getShape(arr) {
  let is1DArr = null;
  let row = 0;
  let col = 0;

  for (let i = 0; i < arr.length; i++) {
    if (isArray(arr[i])) {
      is1DArr = false;
      const element = arr[i];

      if (is1DArr) {
        throw new Error(`Wrong element depth [${element}]`);
      }

      row += 1;

      if (i && col !== element.length) {
        throw new Error(`Wrong column. Previous: ${col}. Current: ${element.length}`);
      }

      for (let j = 0; j < element.length; j++) {
        if (isArray(element[j])) {
          throw new Error(`Wrong depth. [${element[j]}]`);
        }
      }

      col = element.length;
    } else {
      if (is1DArr === false) {
        throw new Error(`Wrong depth. ${arr[i]}`);
      }

      is1DArr = true;
      row += 1;
    }
  }

  return { row, col };
}
