const httpStatus = require('http-status');
const { CustomQuestion } = require('../models');
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

module.exports = { createCustomQuestion };
