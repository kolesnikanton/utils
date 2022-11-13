const get = (obj, key, defValue) => (
  Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : defValue
);

export default get;
