module.exports = ({items = [], limit, offset = 0, total} = {}) => {
  const count = items.length;

  /**
   * @class PaginatedList
   * @template T
   */
  return {
    /**
     * @type {T[]}
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
    total: total || count,
  };
};
