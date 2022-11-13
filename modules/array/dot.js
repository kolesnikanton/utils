import transpose from './transpose';
import getShape from './getShape';
import { isArray } from './utils';

function getDotProduct(a, b) {
  const res = a.map((el, i) => el * b[i]);
  return res.reduce((prev, curr) => prev + curr);
}

// TODO: Optimize - without result
export default function dot(a, b) {
  if (!isArray(a) && !isArray(b)) {
    throw new Error('Wrong. It`s not an array');
  }

  const aShape = isArray(a) ? getShape(a) : {};
  const bShape = isArray(b) ? getShape(b) : {};

  let result;

  // Case 1: Scalar Multiplication
  // If either a or b is 0-D
  function case1(c, d, dShape) {
    if (!isArray(c)) {
      // n & [n, n]
      if (dShape.col === 0) {
        result = d.map(el => el * c);
      }

      // n & [[n, n], [n, n]]
      if (dShape.col > 0) {
        result = d.map(dRow => dRow.map(el => el * c));
      }
    }
  }

  case1(a, b, bShape);
  case1(b, a, aShape);

  // Case 2: Inner product of vectors
  // If both a and b are 1-D arrays
  // [n, n] & [n, n]
  if (aShape.col === 0 && bShape.col === 0 && aShape.row === bShape.row) {
    result = getDotProduct(a, b);
  }

  // Case 3: Matrix multiplication
  // If both a and b are 2-D arrays
  // [[n, n], [n, n]] & [[n, n], [n, n]]
  const isCorrect2DShapes = aShape.col === bShape.row || aShape.row === bShape.col;

  if (isCorrect2DShapes && aShape.col > 0 && bShape.col > 0) {
    const transposedB = transpose(b);
    result = a.map(aR => transposedB.map(bR => getDotProduct(aR, bR)));
  }

  if (!result) {
    throw new Error('Wrong. Unexpected case');
  }

  return result;
}
