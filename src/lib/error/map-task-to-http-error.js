const createHttpError = require('./http');

const ERROR_CODE_TO_STATUS_MAP = {
  // 400
  AuthTokenAlreadyExists: 400,
  ChannelAlreadyExists: 400,
  EmailAlreadyTaken: 400,
  InvalidPatch: 400,
  InvalidChannel: 400,

  // 403
  InsufficientPrivileges: 403,

  // 404
  UnknownChannel: 404,
  UnknownRealm: 404,
};

/**
 * Convert a task error to an http error object.
 * @param {TaskError} taskError The task error
 * @return {HttpError|null} The http error
 */
module.exports = taskError => {
  const {code, message} = taskError;

  const status = ERROR_CODE_TO_STATUS_MAP[code];

  if (status) {
    return createHttpError({status, code, message});
  }

  return null;
};
