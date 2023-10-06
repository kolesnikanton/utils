# Utils
Lightweight javascript library that provides mathematical operations on multidimensional arrays and more

## Installation

### Install with NPM
```
npm install @antonkolesnik/utils
```
### Install with Yarn
```
yarn add @antonkolesnik/utils
```

## Usage
```js
import { OPERATION_NAME } from '@antonkolesnik/utils';

const result = OPERATION_NAME(arguments);
console.log(result);
```
### Array
---
#### Arithmetically valid cases: Sum | Multiply | Divide | Minus
```js
// [n] && [n...n]
// [n...n] & [n...n]
// [n...n] & [[n...n]]
// [n] & [[n...n]]
// [[n]] & [n...n]
// [[n]] && [[n...n]]
// [[n...n]] & [[n...n]]
```

#### Sum array elements
```js
array.sum([1], [1]); // [2]
array.sum([1], [1, 2, 3]));  // [2, 3, 4]
array.sum([[1], [2]], [[1, 2, 3], [1, 2, 3]]); // [[2, 3, 4], [3, 4, 5]]
```

#### Multiply array elements
```js
array.multiply([[2], [2]], [2]); // [[4], [4]]
array.multiply([54.4], [-5.425]); // [-295.12]
array.multiply([0], [-5.425]); // [-0]
```

#### Divide array elements
```js
array.divide([[2], [2]], [2]); // [[4], [4]]
array.divide([1], [[2], [2]]); // ([[0.5], [0.5]])
array.divide([[124.234], [32.424]], [2442.54]); // [[0.05086262661000434], [0.01327470583900366]]
```

#### Minus array elements
```js
array.minus([10, 8, 6], [[2], [3]]) // [[8, 6, 4], [7, 5, 3]]
array.minus([-4.0], [-0.55]); // [-3.45]
array.minus([[1], [0]], [[0.5], [0.5]]); // [[0.5], [-0.5]]
```

#### Exponential function array elements
```js
array.exp([[2], [3]]) // [[7.38905609893065], [20.085536923187668]]
array.exp([[[-2], 3]]) // [[[0.1353352832366127], 20.085536923187668]]
```

#### Array shape
```js
array.getShape([[1, 2, 3], [1, 2, 3]]); // { col: 3, row: 2 }
array.getShape([[1], [2], [3]]) // { col: 1, row: 3 }
```

#### Transpose array
```js
array.transpose([[1, 2, 3], [3, 4, 5]]); // [[1, 3], [2, 4], [3, 5]]
array.transpose([[1, 2], [3, 4]]); // [[1, 3], [2, 4]]
```

#### Dot product
```js
// Case 1: Scalar Multiplication
// If either a or b is 0-D
array.dot(2, [2, 3, 4]) // [4, 6, 8]
array.dot(2, [[2, 3], [4, 5]]) // [[4, 6], [8, 10]]

// Case 2: Inner product of vectors
// If both a and b are 1-D arrays
array.dot([1, 2, 3], [1, 2, 3]) // 14

// Case 3: Matrix multiplication
// If both a and b are 2-D arrays
array.dot([[1, 2], [3, 4]], [[5, 6], [7, 8]]) // [[19, 22], [43, 50]]
array.dot([[1, 2, 3], [3, 4, 5]], [[5, 6, 4, 5], [7, 8, 5, 6], [3, 4, 5, 6]]) // [[28, 34, 29, 35], [58, 70, 57, 69]]
```


### get
---
```js
get(obj, key, defaultValue)
```
  * Return a value from an object key even the value is null, undefined, 0, NaN, ''...
  * Return a default value only when an obj key is undefined


### isEmpty
---
```js
isEmpty(value)
```
  * Check each type
  * 0 and false is not empty


### getValueType
---
```js
getValueType(value)
```
  * Return 'array' instead 'object' when a value is an array
  * Return 'null' instead 'object' when a value is null

### isInt
---
```js
isInt(value)
```
  * Return true when a value is a integer
  * Works only with a number type
  * *.0 is also true

### combineStrings
---
```js
combineStrings('1', '  ', '2'); // '1 2'
combineString([0 > 1, '1', '0']); // '0'
combineString('1', [0 > 1, '1', '0'], '1'); // '1 0 1'
```
  * Works with conditions. Send an array, where arr[0] is a condition, arr[1] is true and arr[2] is false
