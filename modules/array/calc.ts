import getShape from './getShape';
import { isNestedArray, wrapArr, isArray } from './utils';

import { ArrayT } from '../types';

export const OPERATORS = {
  sum: (a: number, b: number) => a + b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
  minus: (a: number, b: number) => a - b,
};

function rCalculation(
  a: ArrayT,
  b: ArrayT,
  operator: (arg1: number, arg2: number) => number,
  aDepth = 0,
  bDepth = 0,
): ArrayT {
  if (isNestedArray(a)) {
    return rCalculation(a[0] as number[], b, operator, aDepth + 1, bDepth);
  }

  if (isNestedArray(b)) {
    return rCalculation(a, b[0] as number[], operator, aDepth, bDepth + 1);
  }

  const aShape = getShape(a);
  const bShape = getShape(b);
  let maxDepth = Math.max(aDepth, bDepth);

  function decreaseMaxDepth() {
    if (maxDepth > 0) {
      maxDepth -= 1;
    }
  }

  // [n] && [n...n]
  if (aShape.col === 0 && bShape.col === 0 && aShape.row === 1) {
    const res = (b as number[]).map(el => operator(a[0] as number, el));
    return wrapArr(res, maxDepth);
  }

  // [n...n] && [n]
  if (aShape.col === 0 && bShape.col === 0 && bShape.row === 1) {
    const res = (a as number[]).map(el => operator(el, a[0] as number));
    return wrapArr(res, maxDepth);
  }

  // [n...n] & [n...n]
  if (aShape.col === bShape.col && aShape.row === bShape.row && aShape.col === 0) {
    const res = (a as number[]).map((el, index) => operator(el, b[index] as number));
    return wrapArr(res, maxDepth);
  }

  // [n...n] & [[n...n]]
  if (aShape.col === 0 && aShape.row > 1 && aShape.row === bShape.col) {
    const res = (b as number[][]).map(row => row.map((el, j) => operator(a[j] as number, el)));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [[n...n]] & [n...n]
  if (aShape.col === bShape.row && bShape.col === 0 && bShape.row > 1) {
    const res = (a as number[][]).map(row => row.map((el, j) => operator(b[j] as number, el)));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [n...n] & [[n]]
  if (aShape.col === 0 && aShape.row > 1 && bShape.col === 1) {
    const res = b.map((_, i) => (a as number[]).map(
      el => operator(el, (b as number[][])[i][0]),
    ));

    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [[n]] & [n...n]
  if (bShape.col === 0 && bShape.row > 1 && aShape.col === 1) {
    const res = a.map((_, i) => (b as number[]).map(
      el => operator(el, (a as number[][])[i][0]),
    ));

    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [n] & [[n...n]]
  if (aShape.col === 0 && aShape.row === 1 && bShape.col > 0) {
    const res = b.map((_, i) => (b[i] as number[]).map(el => operator(a[0] as number, el)));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [[n...n]] & [n]
  if (bShape.col === 0 && bShape.row === 1 && aShape.col > 0) {
    const res = a.map((_, i) => (a[i] as number[]).map(el => operator(el, b[0] as number)));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [[n...n]] && [[n]]
  if (aShape.col > 0 && bShape.col === 1) {
    const res = a.map((_, i) => (a[i] as number[]).map(
      el => operator(el, (b as number[][])[i][0]),
    ));

    return wrapArr(res, maxDepth);
  }

  // [[n]] && [[n...n]]
  if (bShape.col > 0 && aShape.col === 1) {
    const res = b.map((_, i) => (b[i] as number[]).map(
      el => operator((a as number[][])[i][0], el),
    ));

    return wrapArr(res, maxDepth);
  }

  // [[n...n]] & [[n...n]]
  if (aShape.row === bShape.row && aShape.col === bShape.col && aShape.col > 0) {
    const res = a.map((_, i) => (a[i] as number[]).map(
      (el, j) => operator(el, (b as number[][])[i][j]),
    ));

    return wrapArr(res, maxDepth);
  }

  throw new Error('Wrong. Unexpected case');
}

function calculation(a: ArrayT, b: ArrayT, operator = OPERATORS.sum) {
  if (!isArray(a) || !isArray(b)) {
    throw new Error('Wrong. It`s not an array');
  }

  return rCalculation(a, b, operator);
}

export function sum(a: ArrayT, b: ArrayT) {
  return calculation(a, b, OPERATORS.sum);
}

export function multiply(a: ArrayT, b: ArrayT) {
  return calculation(a, b, OPERATORS.multiply);
}

export function divide(a: ArrayT, b: ArrayT) {
  return calculation(a, b, OPERATORS.divide);
}

export function minus(a: ArrayT, b: ArrayT) {
  return calculation(a, b, OPERATORS.minus);
}
