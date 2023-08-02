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
      response.json({result: 'next'});
    }

    const modifiers = realmLimits ? {
      max_connection_lifetime: realmLimits.sessionMaxConnectionLifetime,
      max_message_rate: realmLimits.sessionMaxMessageRate,
      max_message_size: realmLimits.sessionMaxMessageSize,
    } : undefined;

    response.json({
      result: 'ok',
      modifiers,
    });
  };
