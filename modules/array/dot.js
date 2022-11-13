import transpose from './transpose';
import getShape from './getShape';
import { isArray } from './utils';

function getDotProduct(a, b) {
  const res = a.map((el, i) => el * b[i]);
  return res.reduce((prev, curr) => prev + curr);
}

export default function dot(a, b) {
  if (!isArray(a) && !isArray(b)) {
    throw new Error('Wrong. It`s not an array');
  }

  const aShape = isArray(a) ? getShape(a) : {};
  const bShape = isArray(b) ? getShape(b) : {};

  // Case 1: Scalar Multiplication
  // If either a or b is 0-D

  // n & [n, n]
  if (!isArray(a) && bShape.col === 0) {
    return b.map(el => a * el);
  }

  // [n, n] & n
  if (!isArray(b) && aShape.col === 0) {
    return a.map(el => el * b);
  }

  // n & [[n, n], [n, n]]
  if (!isArray(a) && bShape.col > 0) {
    return b.map(bRow => bRow.map(el => a * el));
  }

  // [[n, n], [n, n]] * n
  if (!isArray(b) && aShape.col > 0) {
    return a.map(aRow => aRow.map(el => el * b));
  }

  // Case 2: Inner product of vectors
  // If both a and b are 1-D arrays

  // [n, n] & [n, n]
  if (aShape.col === 0 && bShape.col === 0 && aShape.row === bShape.row) {
    return getDotProduct(a, b);
  }

  // Case 3: Matrix multiplication
  // If both a and b are 2-D arrays

  const isCorrect2DShapes = aShape.col === bShape.row || aShape.row === bShape.col;

  // [[n, n], [n, n]] & [[n, n], [n, n]]
  if (isCorrect2DShapes && aShape.col > 0 && bShape.col > 0) {
    const transposedB = transpose(b);
    return a.map(aR => transposedB.map(bR => getDotProduct(aR, bR)));
  }

  throw new Error('Wrong. Unexpected case');
}
