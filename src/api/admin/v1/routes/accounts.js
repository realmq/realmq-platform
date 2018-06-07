module.exports = tasks => ({
  post: async (req, res) => {
    const {ok, result: account, error} = await tasks.admin.createAccount(req.body);
    if (ok) {
      res.json(account);
    } else if (error.name === 'TaskError' && error.reason === 'EmailAlreadyTaken') {
      res.status(400).json({
        code: error.reason,
        message: error.message
      });
    }
  }
});
