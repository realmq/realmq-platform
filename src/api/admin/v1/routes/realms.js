/**
 * @param {{admin: AdminTasks}} tasks The task injection
 * @return {object} The express-openapi router
 */
module.exports = tasks => ({
  async get(req, res) {
    const {offset, limit} = req.query;
    const {ok, result: list, error} =
      await tasks.admin.listRealms({account: req.account, offset, limit});
    if (!ok) {
      throw error;
    }
    return res.json(list);
  },

  async post(req, res) {
    const {account, body: {name}} = req;
    const {ok, result: realm, error} = await tasks.admin.createRealm({account, name});

    if (ok) {
      return res.status(201).json(realm);
    }

    return Promise.reject(error);
  },
});
