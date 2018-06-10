module.exports = tasks => ({
  get: async (req, res) => {
    const {account, query: {offset, limit}, params: {realmId}} = req;
    const {ok, result: list, error} =
      await tasks.admin.listRealmTokens({account, realmId, offset, limit});

    if (ok) {
      return res.json(list);
    }

    if (error && error.name === 'TaskError' && error.reason === 'UnknownEntity') {
      return res.status(403).json({
        code: 'ACCESS_DENIED',
        message: error.message,
      });
    }

    return Promise.reject(error);
  },

  post: async (req, res) => {
    const {account, params: {realmId}, body: {id, userId, scope, description}} = req;
    const {ok, result: realmToken, error} =
      await tasks.admin.createRealmToken({account, realmId, id, userId, scope, description});

    if (ok) {
      return res.status(201).json(realmToken);
    }

    if (error && error.name === 'TaskError' && error.reason === 'UnknownEntity') {
      return res.status(403).json({
        code: 'ACCESS_DENIED',
        message: error.message,
      });
    }

    return Promise.reject(error);
  },
});
