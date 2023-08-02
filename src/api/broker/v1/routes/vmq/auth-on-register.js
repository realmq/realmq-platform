const stripUndefined = require('../../../../../lib/strip-undefined');

/**
 *
 * @param {BrokerTasks#authorizeRegister} authorizeRegister Task
 * @returns {BrokerV1VmqRoutes#authOnRegister} Handler
 */
module.exports = ({authorizeRegister}) =>
  /**
   * @function BrokerV1VmqRoutes#authOnRegister
   * @param {object} request Request
   * @param {object} response Response
   * @returns {Promise<void>} Nothing
   */
  async (request, response) => {
    const {client_id: clientId} = request.body || {};
    if (!clientId) {
      return response.status(400).send();
    }

    const {authorized, realmLimits} = await authorizeRegister(clientId);
    if (!authorized) {
      return response.json({result: 'next'});
    }

    const modifiers = stripUndefined({
      max_message_size: realmLimits?.sessionMaxMessageSize,
    });

    response.json({
      result: 'ok',
      // VerneMQ fails if modifiers is an empty object
      modifiers: Object.entries(modifiers).length > 0 ? modifiers : undefined,
    });
  };
