import {
  sum, multiply, minus, divide,
} from '../array/calc';
import getShape from '../array/getShape';
import transpose from '../array/transpose';
import exp from '../array/exp';
import dot from '../array/dot';
import { wrapArr } from '../array/utils';

const mock = {
  D1: {
    arr1: [1],
    arr2: [1, 2],
    arr3: [1, 2, 3],
  },
  D2: {
    arr1: [[1], [2], [3]],
    arr2: [[1, 2], [1, 2]],
    arr3: [[1, 2, 3], [1, 2, 3]],
  },
};

it('calc (unusual cases): should return correct values', () => {
  expect(sum([], [])).toEqual([]);
  expect(sum([1], [])).toEqual([]);
  expect(sum([], [1])).toEqual([]);
  // @ts-expect-error Testing purposes
  expect(sum(['1'], [1])).toEqual(['11']);

  // Wrap
  expect(sum([[0]], [0])).toEqual([[0]]);
  expect(sum([[0], [0]], [[[0]]])).toEqual([[[0], [0]]]);
  expect(sum([[[[0]]]], [0])).toEqual([[[[0]]]]);
  expect(sum([[0], [0]], [0])).toEqual([[0], [0]]);
});

it('calc: should return correct error messages', () => {
  // @ts-expect-error Testing purposes
  expect(() => sum(1, 1)).toThrow('Wrong. It`s not an array');
  // @ts-expect-error Testing purposes
  expect(() => sum(null, [1])).toThrow('Wrong. It`s not an array');
  // @ts-expect-error Testing purposes
  expect(() => sum()).toThrow('Wrong. It`s not an array');
  // @ts-expect-error Testing purposes
  expect(() => sum('[]', '[]')).toThrow('Wrong. It`s not an array');

  expect(() => sum([1, [2]], [[2], [[2]]])).toThrow('Wrong depth');
  // @ts-expect-error Testing purposes
  expect(() => sum([0, [[1, 2]], [2]], [[2], [[2]]])).toThrow('Wrong depth');

  expect(() => sum(mock.D1.arr2, mock.D1.arr3)).toThrow('Wrong. Unexpected case');
  expect(() => sum(mock.D1.arr3, mock.D1.arr2)).toThrow('Wrong. Unexpected case');

  expect(() => sum(mock.D1.arr2, mock.D2.arr3)).toThrow('Wrong. Unexpected case');
  expect(() => sum(mock.D1.arr3, mock.D2.arr2)).toThrow('Wrong. Unexpected case');
  expect(() => sum(mock.D1.arr3, mock.D2.arr2)).toThrow('Wrong. Unexpected case');
  expect(() => sum(mock.D2.arr2, mock.D1.arr3)).toThrow('Wrong. Unexpected case');
  expect(() => sum(mock.D2.arr3, mock.D1.arr2)).toThrow('Wrong. Unexpected case');
  expect(() => sum(mock.D2.arr3, mock.D1.arr2)).toThrow('Wrong. Unexpected case');
});

it('sum: should return correct values', () => {
  // [n...n] & [n...n]
  expect(sum(mock.D1.arr1, mock.D1.arr1)).toEqual([2]);
  expect(sum(mock.D1.arr2, mock.D1.arr2)).toEqual([2, 4]);
  expect(sum(mock.D1.arr3, mock.D1.arr3)).toEqual([2, 4, 6]);

  // [n] && [n...n]
  expect(sum(mock.D1.arr1, mock.D1.arr2)).toEqual([2, 3]);
  expect(sum(mock.D1.arr1, mock.D1.arr3)).toEqual([2, 3, 4]);

  // [n...n] && [n]
  expect(sum(mock.D1.arr2, mock.D1.arr1)).toEqual([2, 3]);
  expect(sum(mock.D1.arr3, mock.D1.arr1)).toEqual([2, 3, 4]);

  // [n] & [[n...n]]
  expect(sum(mock.D1.arr1, mock.D2.arr1)).toEqual([[2], [3], [4]]);
  expect(sum(mock.D1.arr1, mock.D2.arr2)).toEqual([[2, 3], [2, 3]]);
  expect(sum(mock.D1.arr1, mock.D2.arr3)).toEqual([[2, 3, 4], [2, 3, 4]]);

  // [n...n] & [[n]]
  expect(sum(mock.D1.arr2, mock.D2.arr1)).toEqual([[2, 3], [3, 4], [4, 5]]);
  expect(sum(mock.D1.arr3, mock.D2.arr1)).toEqual([[2, 3, 4], [3, 4, 5], [4, 5, 6]]);

  // [n...n] & [[n...n]]
  expect(sum(mock.D1.arr2, mock.D2.arr2)).toEqual([[2, 4], [2, 4]]);

  // [[n]] & [n...n]
  expect(sum(mock.D2.arr1, mock.D1.arr1)).toEqual([[2], [3], [4]]);
  expect(sum(mock.D2.arr1, mock.D1.arr2)).toEqual([[2, 3], [3, 4], [4, 5]]);
  expect(sum(mock.D2.arr1, mock.D1.arr3)).toEqual([[2, 3, 4], [3, 4, 5], [4, 5, 6]]);

  // [[n...n]] & [n]
  expect(sum(mock.D2.arr2, mock.D1.arr1)).toEqual([[2, 3], [2, 3]]);
  expect(sum(mock.D2.arr3, mock.D1.arr1)).toEqual([[2, 3, 4], [2, 3, 4]]);

  // [[n...n]] & [n...n]
  expect(sum(mock.D2.arr2, mock.D1.arr2)).toEqual([[2, 4], [2, 4]]);

  // [[n...n]] & [[n...n]]
  expect(sum(mock.D2.arr1, mock.D2.arr1)).toEqual([[2], [4], [6]]);

  // [[n...n]] && [[n]]
  expect(sum(mock.D2.arr3, mock.D2.arr1)).toEqual([[2, 3, 4], [3, 4, 5]]);

  // [[n]] && [[n...n]]
  expect(sum(mock.D2.arr1, mock.D2.arr3)).toEqual([[2, 3, 4], [3, 4, 5]]);
});

it('calc (operators): should return correct values', () => {
  expect(minus([2], [1])).toEqual([1]);
  expect(minus([0], [5])).toEqual([-5]);
  expect(minus([-4.0], [-0.55])).toEqual([-3.45]);
  expect(minus([[1], [0]], [[0.5], [0.5]])).toEqual([[0.5], [-0.5]]);

  expect(multiply([5], [5])).toEqual([25]);
  expect(multiply([54.4], [-5.425])).toEqual([-295.12]);
  expect(multiply([0], [-5.425])).toEqual([-0]);

  expect(divide([10], [2])).toEqual([5]);
  expect(divide([15], [2.54])).toEqual([5.905511811023622]);
  expect(divide([[124.234], [32.424]], [2442.54])).toEqual(
    [[0.05086262661000434], [0.01327470583900366]],
  );
  expect(divide([1], [[2], [2]])).toEqual([[0.5], [0.5]]);
  expect(divide([[2], [2]], [1])).toEqual([[2], [2]]);
});

it('wrapArr: should return correct values', () => {
  expect(wrapArr([1], 2)).toEqual([[[1]]]);
  expect(wrapArr([1, 2], 1)).toEqual([[1, 2]]);
  expect(wrapArr([1, 2, 3], 0)).toEqual([1, 2, 3]);
  expect(wrapArr([1])).toEqual([1]);
});

it('getShape: should return correct values', () => {
  expect(getShape(mock.D1.arr1)).toEqual({ col: 0, row: 1 });
  expect(getShape(mock.D1.arr2)).toEqual({ col: 0, row: 2 });
  expect(getShape(mock.D1.arr3)).toEqual({ col: 0, row: 3 });

  expect(getShape(mock.D2.arr1)).toEqual({ col: 1, row: 3 });
  expect(getShape(mock.D2.arr2)).toEqual({ col: 2, row: 2 });
  expect(getShape(mock.D2.arr3)).toEqual({ col: 3, row: 2 });

  // Errors
  expect(() => getShape([1, [1]])).toThrow('Wrong depth');
  expect(() => getShape([[1, 1], 1])).toThrow('Wrong depth');
  expect(() => getShape([[1], [1, 1]])).toThrow('Wrong column');
});

it('transpose: should return correct values', () => {
  expect(transpose([2, 3])).toEqual([2, 3]);
  expect(transpose([[2], [3]])).toEqual([[2, 3]]);
  expect(transpose([[1, 2], [3, 4]])).toEqual([[1, 3], [2, 4]]);
  expect(transpose([[1, 2, 3], [3, 4, 5]])).toEqual([[1, 3], [2, 4], [3, 5]]);

  // Errors
  // @ts-expect-error Testing purposes
  expect(() => transpose(1)).toThrow('Wrong. It`s not an array');
  // @ts-expect-error Testing purposes
  expect(() => transpose([1, [1], [[1], [1]]])).toThrow('Wrong depth');
});

it('exp: should return correct values', () => {
  expect(exp([2, 3])).toEqual([7.38905609893065, 20.085536923187668]);
  expect(exp([[2], [3]])).toEqual([[7.38905609893065], [20.085536923187668]]);
  expect(exp([[[-2], 3]])).toEqual([[[0.1353352832366127], 20.085536923187668]]);
  expect(exp([[2, 3], [3]])).toEqual(
    [[7.38905609893065, 20.085536923187668], [20.085536923187668]],
  );

  // Errors
  // @ts-expect-error Testing purposes
  expect(() => exp(1)).toThrow('Wrong. It`s not an array');
});

it('dot: should return correct values', () => {
  // Case 1: Scalar Multiplication
  expect(dot(2, [2, 3, 4])).toEqual([4, 6, 8]);
  expect(dot([2, 3, 4], 2)).toEqual([4, 6, 8]);
  expect(dot(2, [[2, 3], [4, 5]])).toEqual([[4, 6], [8, 10]]);
  expect(dot([[2, 3], [4, 5]], 2)).toEqual([[4, 6], [8, 10]]);
  expect(dot(2, [[2, 3], [4, 5]])).toEqual([[4, 6], [8, 10]]);

  // Case 2: Inner product of vectors
  expect(dot([1, 2, 3], [1, 2, 3])).toEqual(14);
  expect(dot([1, 2], [1, 2])).toEqual(5);
  expect(dot([2], [2])).toEqual(4);

  // Case 3: Matrix multiplication
  expect(dot([[1, 2], [3, 4]], [[5, 6], [7, 8]])).toEqual([[19, 22], [43, 50]]);
  expect(dot([[1, 2, 3], [3, 4, 5]], [[5, 6, 4, 5], [7, 8, 5, 6], [3, 4, 5, 6]])).toEqual(
    [[28, 34, 29, 35], [58, 70, 57, 69]],
  );

  // Errors;
  // @ts-expect-error Testing purposes
  expect(() => dot()).toThrow('Wrong. It`s not an array');
  expect(() => dot([[[1, 2], [3, 4]]], [[5, 6], [7, 8]])).toThrow('Wrong depth');
  expect(() => dot([1], [[1, 2], [1, 2]])).toThrow('Wrong. Unexpected case');
  expect(() => dot([1, 2], [[1, 2, 3], [1, 2, 3]])).toThrow('Wrong. Unexpected case');
  expect(() => dot([[1, 2], [3, 4]], [1, 2])).toThrow('Wrong. Unexpected case');
  expect(() => dot([1, 2], [[1, 2], [1, 2]])).toThrow('Wrong. Unexpected case');
  expect(() => dot([1], [[1], [1]])).toThrow('Wrong. Unexpected case');
  expect(() => dot([[1], [2]], [1])).toThrow('Wrong. Unexpected case');
});
