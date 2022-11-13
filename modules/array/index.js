import transpose from './transpose';
import getShape from './getShape';
import dot from './dot';
import { isNestedArray, wrapArr, isArray } from './utils';

export const OPERATORS = {
  sum: (a, b) => a + b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  minus: (a, b) => a - b,
};

function rCalculation(arr1, arr2, operator, arr1Depth = 0, arr2Depth = 0) {
  if (isNestedArray(arr1)) {
    return rCalculation(arr1[0], arr2, operator, arr1Depth + 1, arr2Depth);
  }

  if (isNestedArray(arr2)) {
    return rCalculation(arr1, arr2[0], operator, arr1Depth, arr2Depth + 1);
  }

  const arr1Shape = getShape(arr1);
  const arr2Shape = getShape(arr2);
  let maxDepth = Math.max(arr1Depth, arr2Depth);

  function decreaseMaxDepth() {
    if (maxDepth > 0) {
      maxDepth -= 1;
    }
  }

  let res;

  if (arr1Shape.row === arr2Shape.row && arr1Shape.col === arr2Shape.col) {
    // Case 1
    if (arr1Shape.col > 0) {
      // [[n...n]...] & [[n...n]...]
      res = arr1.map((_, i) => arr1[i].map((el, j) => operator(el, arr2[i][j])));
    }

    // Case 2
    if (arr1Shape.col === 0) {
      // [n...n] & [n...n]
      res = arr1.map((el, index) => operator(el, arr2[index]));
    }
  }

  // [n, n] & [[n, n], [n, n]...]
  function case3(a, b, aShape, bShape) {
    if (aShape.col === 0 && aShape.row > 1 && aShape.row === bShape.col) {
      res = b.map((_, i) => b[i].map((el, j) => operator(el, a[j])));
      decreaseMaxDepth();
    }
  }

  case3(arr1, arr2, arr1Shape, arr2Shape);
  case3(arr2, arr1, arr2Shape, arr1Shape);

  // [n, n, n] & [[n], [n]]
  function case4(a, b, aShape, bShape) {
    if (aShape.col === 0 && aShape.row > 1 && bShape.col === 1) {
      res = b.map((_, i) => a.map(el => operator(el, b[i][0])));
      decreaseMaxDepth();
    }
  }

  case4(arr1, arr2, arr1Shape, arr2Shape);
  case4(arr2, arr1, arr2Shape, arr1Shape);

  // [n] & [[n...n], [n...n]]
  function case5(a, b, aShape, bShape) {
    if (aShape.col === 0 && aShape.row === 1 && bShape.col > 0) {
      res = b.map((_, i) => b[i].map(el => operator(el, a[0])));
      decreaseMaxDepth();
    }
  }

  case5(arr1, arr2, arr1Shape, arr2Shape);
  case5(arr2, arr1, arr2Shape, arr1Shape);

  // [[n...n], [n...n]] && [[n], [n]]
  function case6(a, b, aShape, bShape) {
    if (aShape.col > 0 && bShape.col === 1 && aShape.row === bShape.row) {
      res = a.map((_, i) => a[i].map(el => operator(el, b[i][0])));
    }
  }

  case6(arr1, arr2, arr1Shape, arr2Shape);
  case6(arr2, arr1, arr2Shape, arr1Shape);

  // [n] && [n, n]
  function case7(a, b, aShape, bShape) {
    if (aShape.col === 0 && bShape.col === 0 && aShape.row === 1) {
      res = b.map(el => operator(el, a[0]));
    }
  }

  case7(arr1, arr2, arr1Shape, arr2Shape);
  case7(arr2, arr1, arr2Shape, arr1Shape);

  if (!res) {
    throw new Error(`Wrong. Unexpected case ${arr1} and ${arr2}`);
  }

  return wrapArr(res, maxDepth);
}

export function calculation(a, b, operator = OPERATORS.sum) {
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

export default {
  minus,
  divide,
  multiply,
  sum,
  getShape,
  transpose,
  dot,
};
