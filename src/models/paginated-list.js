module.exports = ({items = [], limit, offset = 0, total} = {}) => {
  const count = items.length;

  /**
   * @typedef {Object} PaginatedList
   */
  return {
    /**
     * @type {Array<Object>}
     */
    items,

    /**
     * @type {number}
     */
    offset,

    /**
     * @type {number}
     */
    count,

    /**
     * @type {number}
     */
    limit: limit || count,

    /**
     * @type {number}
     */
    total: total || count
  };
};
