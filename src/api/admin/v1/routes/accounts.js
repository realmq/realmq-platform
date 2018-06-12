/**
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @param {AdminApiV1Mappers} mappers Mappers
 * @returns {object} Path handler
 */
module.exports = (tasks, mappers) => ({
  post: async (req, res) => {
    const {ok, result: account, error} = await tasks.admin.createAccount(req.body);

    if (!ok) {
      throw error;
    }

    res.status(201).json(mappers.account(account));
  },
});
