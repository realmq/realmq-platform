const powers = new Map([
  ['s', 1],
  ['m', 60],
  ['h', 3600],
  ['d', 86400],
]);

module.exports = duration => {
  const value = parseInt(duration.slice(0, -1), 10);
  const suffix = duration[duration.length - 1];

  if (
    Number.isNaN(value) ||
    value < 0 ||
    !powers.has(suffix)
  ) {
    throw new Error(`Invalid duration: ${duration}`);
  }

  return value * powers.get(suffix);
};
