module.exports = tasks => ({
  get: async (req, res) => {
    const {ok, result: list, error} = await tasks.admin.listRealms(req.account, 0, 20);
    if (!ok) {
      throw error;
    }
    return res.json(list);
  }
});
