# utils

## Array
```js
import { array } from '@antonkolesnik/utils';
```

* Sum array elements
```js
array.sum([1], [1]); // [2]
```

* Multiply array elements
```js
array.multiply([[2], [2]], [2]); // [[4], [4]]
```

* Divide array elements
```js
array.multiply([[2], [2]], [2]); // [[4], [4]]
```

* Minus array elements
```js
array.minus([10, 8, 6], [[2], [3]]) // [[8, 6, 4], [7, 5, 3]]
```

* Exponential function array elements
```js
array.exp([[2], [3]]) // [[7.38905609893065], [20.085536923187668]]
```

* Array shape
```js
array.getShape([[1, 2, 3], [1, 2, 3]]); // { col: 3, row: 2 }
```

* Transpose array
```js
array.transpose([[1, 2, 3], [3, 4, 5]]); // [[1, 3], [2, 4], [3, 5]]
```

* Dot product
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


## get
```js
get(obj, key, defaultValue)
```
  * Return a value from an object key even the value is null, undefined, 0, NaN, ''...
  * Return a default value only when an obj key is undefined


## isEmpty
```js
isEmpty(value)
```
  * Check each type
  * 0 and false is not empty


## getValueType
```js
getValueType(value)
```
  * Return 'array' instead 'object' when a value is an array
  * Return 'null' instead 'object' when a value is null

## isInt
```js
isInt(value)
```
  * Return true when a value is a integer
  * Works only with a number type
  * *.0 is also true