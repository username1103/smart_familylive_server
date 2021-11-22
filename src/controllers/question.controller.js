const httpStatus = require('http-status');
const { Question } = require('../models');
const catchAsync = require('../utils/catchAsync');

const createQuestion = catchAsync(async (req, res) => {
  const { contents } = req.body;

  const question = await Question.findOne().sort({ number: -1 });

  const maxNumber = question === null ? 0 : question.number;
  const result = await Question.create({ number: maxNumber + 1, contents });

  res.status(httpStatus.CREATED).send({ result });
});

module.exports = { createQuestion };
