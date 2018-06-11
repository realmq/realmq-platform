/**
 * @typedef {Function} GenericListMapper
 * @template DataModel, ViewModel
 * @param {PaginatedList<DataModel>} list The list
 * @param {function(DataModel):ViewModel} mapItem Item mapping function
 * @return {PaginatedList<ViewModel>} The mapped result list
 */
module.exports = ({
  list: {limit = 0, offset = 0, count = null, total = null, items = []},
  mapItem = (i => i),
}) => ({
  limit,
  offset,
  count: count === null ? items.length : count,
  total: total === null ? items.length : total,
  items: items.map(mapItem),
});
