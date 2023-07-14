import transpose from './transpose';
import getShape from './getShape';
import { isArray } from './utils';
import { ArrayT } from '../types';

function getDotProduct(a: number[], b: number[]): number {
  const res = a.map((el, i) => el * b[i]);
  return res.reduce((prev, curr) => prev + curr);
}

type DotT = number | ArrayT;
export default function dot(a: DotT, b: DotT): DotT {
  if (!isArray(a) && !isArray(b)) {
    throw new Error('Wrong. It`s not an array');
  }

  const aShape = isArray(a) ? getShape(a as ArrayT) : null;
  const bShape = isArray(b) ? getShape(b as ArrayT) : null;

  // Case 1: Scalar Multiplication
  // If either a or b is 0-D

  // n & [n, n]
  if (!isArray(a) && bShape && bShape.col === 0) {
    return (b as number[]).map(el => (a as number) * el);
  }

  // [n, n] & n
  if (!isArray(b) && aShape && aShape.col === 0) {
    return (a as number[]).map(el => el * (b as number));
  }

  // n & [[n, n], [n, n]]
  if (!isArray(a) && bShape && bShape.col > 0) {
    return (b as number[][]).map(bRow => bRow.map(el => (a as number) * el));
  }

  // [[n, n], [n, n]] * n
  if (!isArray(b) && aShape && aShape.col > 0) {
    return (a as number[][]).map(aRow => aRow.map(el => el * (b as number)));
  }

  // Case 2: Inner product of vectors
  // If both a and b are 1-D arrays

  if (aShape === null || bShape === null) {
    throw new Error('Wrong. aShape and bShape should not be null for >=1-D arrays');
  }

  // [n, n] & [n, n]
  if (aShape.col === 0 && bShape.col === 0 && aShape.row === bShape.row) {
    return getDotProduct(a as number[], b as number[]);
  }

  // Case 3: Matrix multiplication
  // If both a and b are 2-D arrays

  const isCorrect2DShapes = aShape.col === bShape.row || aShape.row === bShape.col;

  // [[n, n], [n, n]] & [[n, n], [n, n]]
  if (isCorrect2DShapes && aShape.col > 0 && bShape.col > 0) {
    const transposedB = transpose(b as number[][]);
    return (a as number[][]).map(aR => transposedB.map(bR => getDotProduct(aR, bR as number[])));
  }

  throw new Error('Wrong. Unexpected case');
}
