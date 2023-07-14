import { VALUE_TYPES } from '../_constants';
import getValueType from '../getValueType';

function isEmptyNumber(number: number) {
  return Number.isNaN(number);
}

function isEmptyString(string: string) {
  return !string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isEmptyArr(arr: any[]) {
  return !arr.length;
}

function isEmptyObj(obj: object) {
  return JSON.stringify(obj) === JSON.stringify({});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isEmpty(value: any) {
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
}

export default isEmpty;
