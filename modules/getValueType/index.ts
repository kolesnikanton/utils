import { VALUE_TYPES } from '../_constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isArray(value: any) {
  return Array.isArray(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValueType(value: any) {
  if (typeof value === VALUE_TYPES.object) {
    if (isArray(value)) {
      return VALUE_TYPES.array;
    }

    if (value === null) {
      return VALUE_TYPES.null;
    }

    return VALUE_TYPES.object;
  }

  return typeof value;
}

export default getValueType;
