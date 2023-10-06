import getValueType from '../getValueType';
import removeExtraSpacesInString from '../removeExtraSpacesInString';

function combineStrings(...args: (string | undefined | [boolean, string, string?])[]): string {
  const result = args.map((arg, index) => {
    const valueType = getValueType(arg);

    if (valueType === 'string') {
      return arg;
    }

    if (valueType === 'undefined') {
      return '';
    }

    const errorMessage = `Unexpected case: arg ${index + 1} in combineStrings`;

    if (valueType === 'array') {
      const arr = arg as [boolean, string, string];
      const isNotCorrectType = getValueType(arr[0]) !== 'boolean'
      || getValueType(arr[1]) !== 'string'
      || (arr[2] && getValueType(arr[2]) !== 'string');

      const isEmpty = !arr[1];

      if (isNotCorrectType || isEmpty) {
        throw new Error(errorMessage);
      }

      return arr[0] ? arr[1] : arr[2];
    }

    throw new Error(errorMessage);
  });

  return removeExtraSpacesInString(result.join(' '));
}

export default combineStrings;
