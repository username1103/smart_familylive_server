const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, groupService, groupMemberService } = require('../services');
const ApiError = require('../utils/ApiError');
const generateRandomNumber = require('../utils/generateRandomNumber');

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const kakaoLogin = catchAsync(async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error);
  }

  const { access_token: accessToken } = await authService.requestKakaoToken(code);

  const data = await authService.getKakaoUserData(accessToken);

  let user = await userService.getUserByKakaoId(data.id);
  if (!user) {
    user = await userService.createUser({ kakaoId: data.id });
    const groupCode = generateRandomNumber(8);
    const group = await groupService.createGroup({ code: groupCode });
    await groupMemberService.insertMember({ groupId: group._id, userId: user._id });
  }

  const tokens = await tokenService.generateAuthTokens(user);

  res.status(httpStatus.OK).send({ ...tokens });
});

module.exports = {
  logout,
  refreshTokens,
  kakaoLogin,
};
