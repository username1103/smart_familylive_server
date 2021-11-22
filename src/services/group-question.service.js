const { GroupQuestion, GroupMember, CustomQuestion } = require('../models');

const getGroupQuestionById = async (id) => {
  return GroupQuestion.findById(id);
};

const reply = async (groupQuestion, user, answer) => {
  groupQuestion.answers.push({ author: user._id, emotion: 'smile', contents: answer });
  await groupQuestion.save();
  const question = await GroupQuestion.findById(groupQuestion._id);
  const memberCnt = await GroupMember.countDocuments();
  if (question.answer.length === memberCnt) {
    question.allReplyed = true;
    await question.save();
  }
};

const getGroupQuestionByGroup = async (group) => {
  return GroupQuestion.find({ group }).sort({ createdAt: -1 });
};

const getNotAllRepliedGroupQuestionByGroup = async (group) => {
  return GroupQuestion.find({ group, allReplied: false }).sort({ createdAt: 1 });
};

module.exports = {
  getGroupQuestionById,
  reply,
  getGroupQuestionByGroup,
  getNotAllRepliedGroupQuestionByGroup,
};
