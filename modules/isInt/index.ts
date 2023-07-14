import { VALUE_TYPES } from '../_constants';
import getValueType from '../getValueType';

function isInt(number: number) {
  if (getValueType(number) === VALUE_TYPES.number) {
    return number % 1 === 0;
  }

  return false;
}

export default isInt;
