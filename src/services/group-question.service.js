const { GroupQuestion } = require('../models');

const getGroupQuestionById = (id) => {
  return GroupQuestion.findById(id);
};

module.exports = { getGroupQuestionById };
