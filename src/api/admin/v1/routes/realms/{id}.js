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
      throw error;
    }

    if (!realm) {
      return res.status(404).json({
        code: 'UnknownRealm',
        message: 'Cannot lookup the given realm.',
      });
    }

    res.json(realm);
  },
});
