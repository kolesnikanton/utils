import { VALUE_TYPES } from './_constants';

const isArray = value => Array.isArray(value);

const getValueType = value => {
  // eslint-disable-next-line valid-typeof
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
};

export default getValueType;
