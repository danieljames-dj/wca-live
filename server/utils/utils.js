const zip = (...arrs) =>
  arrs.length === 0 ? [] : arrs[0].map((_, i) => arrs.map(arr => arr[i]));

const firstResult = (arr, fn) =>
  arr.reduce((result, x) => result || fn(x), null);

const sortCompare = (x, y) =>
  x < y ? -1 : (x > y ? 1 : 0);

const sortByArray = (arr, fn) => {
  const values = new Map(arr.map(x => [x, fn(x)])); /* Compute every value once. */
  return arr.slice().sort((x, y) =>
    firstResult(zip(values.get(x), values.get(y)), ([a, b]) => sortCompare(a, b))
  );
};

module.exports = {
  zip,
  sortByArray,
};