const httpStatus = require('http-status');
const CryptoJs = require('crypto-js');
const { groupQuestionService, userService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const convertGroupQuestion = require('../utils/convertGroupQuestion');

const getGroupQuestion = catchAsync(async (req, res) => {
  const { grp_qus_id: groupQuestionId } = req.params;

  const groupQuestion = await groupQuestionService.getGroupQuestionById(groupQuestionId);

  if (!groupQuestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  const groupQuestionObject = groupQuestion.toObject();

  res.status(httpStatus.OK).send(convertGroupQuestion(groupQuestionObject));
});

const getCustomGroupQuestion = catchAsync(async (req, res) => {
  const { grp_qus_id: groupQuestionId } = req.params;

  const groupQuestion = await groupQuestionService.getGruopCustomQuestion(groupQuestionId);
  if (!groupQuestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  res.status(httpStatus.OK).send({ ...groupQuestion.toObject() });
});

const reply = catchAsync(async (req, res) => {
  const { grp_qus_id: groupQuestionId } = req.params;
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

module.exports = { getGroupQuestion, reply, getCustomGroupQuestion };
