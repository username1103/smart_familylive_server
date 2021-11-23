const httpStatus = require('http-status');
const { groupService, groupMemberService, groupQuestionService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const generateRandomNumber = require('../utils/generateRandomNumber');

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

  res.status(httpStatus.OK).send({ ...group.toObject() });
});

const getMembers = catchAsync(async (req, res) => {
  const { groupId } = req.params;

  const groupMembers = await groupMemberService.getMembers({ groupId });

  res.status(httpStatus.OK).send({ groupMembers });
});

const getQuestions = catchAsync(async (req, res) => {
  const { groupId } = req.params;

  const groupQuestions = await groupQuestionService.getGroupQuestionByGroup(groupId);

  res.status(httpStatus.OK).send({ groupQuestions });
});

const updateGroupTime = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const { time, groupItemId } = req.body;

  // groupItemId 사용 처리

  await groupService.updateGroupTime(groupId, time);

  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = { createGroup, getGroup, getMembers, getQuestions, updateGroupTime };
