/**
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @returns {object} Path handler
 */
module.exports = tasks => ({
  post: async (req, res) => {
    const {ok, result: account, error} = await tasks.admin.createAccount(req.body);

    if (!ok) {
      throw error;
    }

    res.status(201).json(account);
  },
});
