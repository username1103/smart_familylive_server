const httpStatus = require('http-status');
const { Question } = require('../models');
const catchAsync = require('../utils/catchAsync');

const createQuestion = catchAsync(async (req, res) => {
  const { contents } = req.body;

  const questions = await Question.find().sort({ number: 1 });
  const maxNumber = questions.length !== 0 ? questions[0].number : 0;
  const result = await Question.create({ number: maxNumber + 1, contents });

  res.status(httpStatus.CREATED).send({ result });
});

module.exports = { createQuestion };
