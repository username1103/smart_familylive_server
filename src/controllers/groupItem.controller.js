const httpStatus = require('http-status');
const { groupService, groupMemberService, groupQuestionService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const convertGroupQuestion = require('../utils/convertGroupQuestion');
const generateRandomNumber = require('../utils/generateRandomNumber');

const buyItem = catchAsync(async (req, res) => {
  const { user: userId } = req.body;

  const code = generateRandomNumber(8);

  const group = await groupService.createGroup({ code });

  await groupMemberService.insertMember({ groupId: group.id, userId });

  res.status(httpStatus.CREATED).send({ code, group });
});

module.exports = {};
