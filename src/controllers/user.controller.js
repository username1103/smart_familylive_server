const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, groupMemberService, groupService, notiService } = require('../services');
const { NotiKinds } = require('../utils/NotiKinds');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user.toObject());
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserGroup = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const groupMember = await groupMemberService.getUserGroup({ userId });

  res.status(httpStatus.OK).send({ groupId: groupMember && groupMember.group });
});

const registerCode = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { code } = req.body;

  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const group = await groupService.getGroupByCode({ code });
  if (group) {
    await groupMemberService.insertMember({ groupId: group._id, userId: user._id });
  } else {
    const userWithCode = await userService.getUserByCode(code);
    if (!userWithCode) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (userWithCode._id.toString() === userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'It is your code');
    }
    const newGroup = await groupService.createGroup({ code });

    await groupMemberService.insertMember({ groupId: newGroup._id, userId });
    await groupMemberService.insertMember({ groupId: newGroup._id, userId: userWithCode._id });
  }

  res.status(httpStatus.CREATED).send();
});

const click = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const notiPayload = notiService.makeNotiPayload(NotiKinds.Click, [userId], {
    user: req.user.name,
  });
  await notiService.sendNoti({ payload: notiPayload });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserGroup,
  registerCode,
  click,
};
