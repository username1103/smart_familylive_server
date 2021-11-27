const httpStatus = require('http-status');
const { groupService, groupMemberService, groupQuestionService, userService } = require('../services');
const { Group, GroupItem } = require('../models');
const catchAsync = require('../utils/catchAsync');
const convertGroupQuestion = require('../utils/convertGroupQuestion');
const generateRandomNumber = require('../utils/generateRandomNumber');
const ApiError = require('../utils/ApiError');

const createGroup = catchAsync(async (req, res) => {
  const { user: userId } = req.body;

  const code = generateRandomNumber(8);

  const group = await groupService.createGroup({ code });

  await groupMemberService.insertMember({ groupId: group.id, userId });

  res.status(httpStatus.CREATED).send({ code, group });
});

const getGroup = catchAsync(async (req, res) => {
  const { groupId } = req.params;

  const group = await groupService.getGroup({ groupId });
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'group not found');
  }

  res.status(httpStatus.OK).send({ ...group.toObject() });
});

const getMembers = catchAsync(async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'group not found');
  }

  const groupMembers = await groupMemberService.getMembers({ groupId });

  res.status(httpStatus.OK).send({ groupMembers });
});

const getQuestions = catchAsync(async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'group not found');
  }

  const groupQuestions = await groupQuestionService.getGroupQuestionByGroup(groupId);

  res
    .status(httpStatus.OK)
    .send({ groupQuestions: groupQuestions.map((groupQuestion) => convertGroupQuestion(groupQuestion.toObject())) });
});

const buyItem = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const { itemId, userId } = req.body;

  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'group not found');
  }

  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  await GroupItem.create({
    group: groupId,
    itme: itemId,
    buyer: userId,
  });

  res.status(httpStatus.NO_CONTENT);
});
const updateGroupTime = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const { time, groupItemId } = req.body;

  // groupItemId 사용 처리

  await groupService.updateGroupTime(groupId, time);

  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = { createGroup, getGroup, getMembers, getQuestions, updateGroupTime, buyItem };
