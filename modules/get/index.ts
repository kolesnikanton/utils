// eslint-disable-next-line @typescript-eslint/no-explicit-any
function get(obj: {[key: string]: any}, key: string, defValue?: string) {
  return Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : defValue;
}

export default get;
