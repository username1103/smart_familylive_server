const httpStatus = require('http-status');
const { CustomQuestion } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createCustomQuestion = catchAsync(async (req, res) => {
  const { contents, group, author } = req.body;

  const result = await CustomQuestion.create({
    group,
    author,
    contents,
    isUsed: false,
  });

  res.status(httpStatus.CREATED).send({ result });
});

const getCustomQuestion = catchAsync(async (req, res) => {
  const { customQuestionId } = req.params;

  const question = await CustomQuestion.findById(customQuestionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  res.status(httpStatus.OK).send({ ...question.toObject() });
});

module.exports = { createCustomQuestion, getCustomQuestion };
