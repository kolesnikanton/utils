import getShape from './getShape';
import { isNestedArray, wrapArr, isArray } from './utils';

export const OPERATORS = {
  sum: (a, b) => a + b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  minus: (a, b) => a - b,
};

function rCalculation(a, b, operator, aDepth = 0, bDepth = 0) {
  if (isNestedArray(a)) {
    return rCalculation(a[0], b, operator, aDepth + 1, bDepth);
  }

  if (isNestedArray(b)) {
    return rCalculation(a, b[0], operator, aDepth, bDepth + 1);
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
    const res = b.map(el => operator(a[0], el));
    return wrapArr(res, maxDepth);
  }

  // [n...n] && [n]
  if (aShape.col === 0 && bShape.col === 0 && bShape.row === 1) {
    const res = a.map(el => operator(el, a[0]));
    return wrapArr(res, maxDepth);
  }

  // [n...n] & [n...n]
  if (aShape.col === bShape.col && aShape.row === bShape.row && aShape.col === 0) {
    const res = a.map((el, index) => operator(el, b[index]));
    return wrapArr(res, maxDepth);
  }

  // [n...n] & [[n...n]]
  if (aShape.col === 0 && aShape.row > 1 && aShape.row === bShape.col) {
    const res = b.map(row => row.map((el, j) => operator(a[j], el)));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [[n...n]] & [n...n]
  if (aShape.col === bShape.row && bShape.col === 0 && bShape.row > 1) {
    const res = a.map(row => row.map((el, j) => operator(b[j], el)));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [n...n] & [[n]]
  if (aShape.col === 0 && aShape.row > 1 && bShape.col === 1) {
    const res = b.map((_, i) => a.map(el => operator(el, b[i][0])));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [[n]] & [n...n]
  if (bShape.col === 0 && bShape.row > 1 && aShape.col === 1) {
    const res = a.map((_, i) => b.map(el => operator(el, a[i][0])));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [n] & [[n...n]]
  if (aShape.col === 0 && aShape.row === 1 && bShape.col > 0) {
    const res = b.map((_, i) => b[i].map(el => operator(a[0], el)));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [[n...n]] & [n]
  if (bShape.col === 0 && bShape.row === 1 && aShape.col > 0) {
    const res = a.map((_, i) => a[i].map(el => operator(el, b[0])));
    decreaseMaxDepth();
    return wrapArr(res, maxDepth);
  }

  // [[n...n]] && [[n]]
  if (aShape.col > 0 && bShape.col === 1) {
    const res = a.map((_, i) => a[i].map(el => operator(el, b[i][0])));
    return wrapArr(res, maxDepth);
  }

  // [[n]] && [[n...n]]
  if (bShape.col > 0 && aShape.col === 1) {
    const res = b.map((_, i) => b[i].map(el => operator(a[i][0], el)));
    return wrapArr(res, maxDepth);
  }

  // [[n...n]] & [[n...n]]
  if (aShape.row === bShape.row && aShape.col === bShape.col && aShape.col > 0) {
    const res = a.map((_, i) => a[i].map((el, j) => operator(el, b[i][j])));
    return wrapArr(res, maxDepth);
  }

  throw new Error('Wrong. Unexpected case');
}

function calculation(a, b, operator = OPERATORS.sum) {
  if (!isArray(a) || !isArray(b)) {
    throw new Error('Wrong. It`s not an array');
  }

  return rCalculation(a, b, operator);
}

export function sum(a, b) {
  return calculation(a, b, OPERATORS.sum);
}

export function multiply(a, b) {
  return calculation(a, b, OPERATORS.multiply);
}

export function divide(a, b) {
  return calculation(a, b, OPERATORS.divide);
}

export function minus(a, b) {
  return calculation(a, b, OPERATORS.minus);
}
