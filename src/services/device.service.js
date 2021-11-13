const { DeviceToken } = require('../models');

const register = async ({ userId, modelName, deviceToken }) => {
  return DeviceToken.updateOne(
    { user: userId, modelName, deviceToken },
    { user: userId, modelName, deviceToken },
    { upsert: true }
  );
};

const remove = async ({ userId, deviceToken }) => {
  return DeviceToken.deleteOne({ user: userId, deviceToken });
};

module.exports = {
  register,
  remove,
};
