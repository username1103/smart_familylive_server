const httpStatus = require('http-status');
const { groupQuestionService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getGroupQuestion = catchAsync(async (req, res) => {
  const { grp_qus_id: groupQuestionId } = req.body;

  const groupQuestion = await groupQuestionService.getGroupQuestionById(groupQuestionId);

  res.status(httpStatus.Ok).send({ ...groupQuestion });
});

module.exports = { getGroupQuestion };
