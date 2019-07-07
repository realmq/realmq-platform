/**
 * @param {AdminTasks} tasks.admin Admin tasks
 * @param {AdminApiV1Mappers} mappers Mappers
 * @returns {object} Path handler
 */
module.exports = mappers => ({
  get: async (req, res) => {
    const {account} = req;

    res.status(200).json(mappers.account(account));
  },
});
