module.exports = ({
  list: {limit = 0, offset = 0, count = null, total = 0, items = []},
  mapItem = (i => i),
}) => ({
  limit,
  offset,
  count: count === null ? items.length : count,
  total,
  items: items.map(mapItem),
});
