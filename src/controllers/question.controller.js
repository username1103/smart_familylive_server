const httpStatus = require('http-status');
const { Question } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createQuestion = catchAsync(async (req, res) => {
  const { contents } = req.body;

  const question = await Question.findOne().sort({ number: -1 });

  const maxNumber = question === null ? 0 : question.number;
  const result = await Question.create({ number: maxNumber + 1, contents });

  res.status(httpStatus.CREATED).send({ result });
});

const getQuestion = catchAsync(async (req, res) => {
  const { qus_id } = req.params;

  const question = await Question.findById(qus_id);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  res.status(httpStatus.OK).send({ ...question.toObject() });
});

module.exports = { createQuestion, getQuestion };
