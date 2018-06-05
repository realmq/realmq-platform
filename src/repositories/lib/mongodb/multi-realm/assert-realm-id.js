module.exports = realmId => {
  if (!realmId) {
    throw new Error('Missing realmId');
  }

  if (typeof realmId !== 'string') {
    throw new TypeError('Invalid realmId');
  }
};
