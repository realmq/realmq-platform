module.exports = tasks => ({
  get: async (req, res) => {
    const {offset, limit} = req.query;
    const {ok, result: list, error} =
      await tasks.admin.listRealms({account: req.account, offset, limit});
    if (!ok) {
      throw error;
    }
    return res.json(list);
  }
});
