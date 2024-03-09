export const isNull = (value) => {
  return Object.is(value, null);
};

export const isUndefined = (value) => {
  return Object.is(value, undefined);
};

export const isNil = (value) => {
  return isNull(value) || isUndefined(value);
};

export const isError = (value) => {
  return value instanceof Error;
};
