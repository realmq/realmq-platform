module.exports = paginatedList => {
  return typeof paginatedList === 'object' &&
    Array.isArray(paginatedList.items) &&
    typeof paginatedList.total === 'number' &&
    typeof paginatedList.offset === 'number' &&
    typeof paginatedList.limit === 'number';
};
