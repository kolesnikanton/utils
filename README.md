# utils

## get
```shell
get(obj, key, defaultValue)
```
  * Return a value from an object key even the value is null, undefined, 0, NaN, ''...
  * Return a default value only when an obj key is undefined


## isEmpty
```shell
isEmpty(value)
```
  * Check each type
  * 0 and false is not empty


## getValueType
```shell
getValueType(value)
```
  * Return 'array' instead 'object' when a value is an array
  * Return 'null' instead 'object' when a value is null

## isInt
```shell
isInt(value)
```
  * Return true when a value is a integer
  * Works only with a number type
  * *.0 is also true
