const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, deviceService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const { user: userId, deviceToken, modelName } = req.body;

  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  await deviceService.register({ userId, modelName, deviceToken });

  res.status(httpStatus.CREATED).send();
});

const remove = catchAsync(async (req, res) => {
  const { user: userId, deviceToken } = req.query;

  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  await deviceService.remove({ userId, deviceToken });

  res.status(httpStatus.CREATED).send();
});

module.exports = {
  register,
  remove,
};
