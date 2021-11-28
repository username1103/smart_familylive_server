const httpStatus = require('http-status');
const { groupQuestionService, userService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const convertGroupQuestion = require('../utils/convertGroupQuestion');

const getGroupQuestion = catchAsync(async (req, res) => {
  const { groupQuestionId } = req.params;

  const groupQuestion = await groupQuestionService.getGroupQuestionById(groupQuestionId);

  if (!groupQuestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  const groupQuestionObject = groupQuestion.toObject();

  res.status(httpStatus.OK).send(convertGroupQuestion(groupQuestionObject));
});

const reply = catchAsync(async (req, res) => {
  const { groupQuestionId } = req.params;
  const { userId, answer } = req.body;

  const groupQuestion = await groupQuestionService.getGroupQuestionById(groupQuestionId);
  if (!groupQuestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  await groupQuestionService.reply(groupQuestion, user, answer);

  await res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { getGroupQuestion, reply };
