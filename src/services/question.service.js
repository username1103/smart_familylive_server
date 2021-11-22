const { Question } = require('../models');

const getQuestion = async (questionId) => {
  return Question.findById(questionId);
};

module.exports = {
  getQuestion,
};
