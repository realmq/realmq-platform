/**
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @returns {object} Path handler
 */
module.exports = tasks => ({
  post: async (req, res) => {
    const {ok, result: account, error} = await tasks.admin.createAccount(req.body);
    if (ok) {
      res.status(201).json(account);
    } else if (error.name === 'TaskError' && error.reason === 'EmailAlreadyTaken') {
      res.status(400).json({
        code: 'EMAIL_ALREADY_TAKEN',
        message: error.message,
      });
    } else {
      return Promise.reject(error);
    }
  },
});
