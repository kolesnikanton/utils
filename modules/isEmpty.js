import { VALUE_TYPES } from './_constants';
import getValueType from './getValueType';

const isEmptyNumber = number => Number.isNaN(number);
const isEmptyString = string => !string;
const isEmptyArr = arr => !arr.length;
const isEmptyObj = obj => JSON.stringify(obj) === JSON.stringify({});

const isEmpty = value => {
  switch (getValueType(value)) {
    case VALUE_TYPES.boolean: {
      return false;
    }

    case VALUE_TYPES.undefined: {
      return true;
    }

    case VALUE_TYPES.null: {
      return true;
    }

    case VALUE_TYPES.number: {
      return isEmptyNumber(value);
    }

    case VALUE_TYPES.string: {
      return isEmptyString(value);
    }

    case VALUE_TYPES.array: {
      return isEmptyArr(value);
    }

    case VALUE_TYPES.object: {
      return isEmptyObj(value);
    }

    default: {
      return false;
    }
  }
};

export default isEmpty;
