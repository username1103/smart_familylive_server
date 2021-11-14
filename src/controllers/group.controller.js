const httpStatus = require('http-status');
const { groupService, groupMemberService } = require('../services');
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

module.exports = { createGroup, getGroup, getMembers };
