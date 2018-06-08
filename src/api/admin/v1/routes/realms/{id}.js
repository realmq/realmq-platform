/**
 *
 * @param {object} tasks Tasks
 * @param {AdminTasks} tasks.admin Admin tasks
 * @returns {{get: get}}
 */
module.exports = tasks => ({
  get: async (req, res) => {
    const {account, params: {id}} = req;
    const {ok, result: realm, error} = await tasks.admin.fetchRealm({account, id});
    if (!ok) {
      return Promise.reject(error);
    }
    if (realm) {
      res.json(realm);
    } else {
      res.status(404).send();
    }
  }
});
