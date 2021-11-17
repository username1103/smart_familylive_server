const { GroupQuestion } = require('../models');

const getGroupQuestionById = async (id) => {
  return GroupQuestion.findById(id);
};

const reply = async (groupQuestion, user, replyBody) => {
  groupQuestion.answers.push({ author: user._id, emotion: 'smile', contents: replyBody });
  await groupQuestion.save();
};

module.exports = { getGroupQuestionById, reply };
