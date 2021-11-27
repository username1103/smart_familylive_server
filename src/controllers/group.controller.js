const httpStatus = require('http-status');
const { groupService, groupMemberService, groupQuestionService, userService } = require('../services');
const { Group, GroupItem, Item } = require('../models');
const catchAsync = require('../utils/catchAsync');
const convertGroupQuestion = require('../utils/convertGroupQuestion');
const generateRandomNumber = require('../utils/generateRandomNumber');
const ApiError = require('../utils/ApiError');
const { presignS3Object } = require('../config/aws-s3');

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

  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'item not found');
  }

  if (group.coin < item.price) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'no enought coin');
  }

  await GroupItem.create({
    group: groupId,
    item: itemId,
    buyer: userId,
  });

  group.coin -= item.price;
  await group.save();

  res.status(httpStatus.NO_CONTENT).send();
});

const getItems = catchAsync(async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'group not found');
  }

  const groupItems = await GroupItem.find({ group: groupId });

  const items = await Promise.all(
    groupItems.map(async (item) => {
      const iteminfo = await Item.findById(item.item);

      return { ...item.toObject(), item: { ...iteminfo.toObject(), image: presignS3Object(iteminfo.image) } };
    })
  );

  res.status(httpStatus.OK).send({ items });
});

const updateGroupTime = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const { time, groupItemId } = req.body;

  // groupItemId 사용 처리

  await groupService.updateGroupTime(groupId, time);

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { createGroup, getGroup, getMembers, getQuestions, updateGroupTime, buyItem, getItems };
