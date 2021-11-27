const AES = require('crypto-js/aes');
const { sendNoti, makeNotiPayload } = require('./noti.service');
const { GroupQuestion, GroupMember, Group } = require('../models');
const { NotiKinds } = require('../utils/NotiKinds');
const config = require('../config/config');

const getGroupQuestionById = async (id) => {
  return GroupQuestion.findById(id);
};

const reply = async (groupQuestion, user, answer) => {
  const authors = groupQuestion.answers.map((_answer) => _answer.author.toString());
  const answerIdx = authors.indexOf(user._id.toString());

  if (answerIdx === -1) {
    groupQuestion.answers.push({
      author: user._id,
      emotion: 'smile',
      contents: AES.encrypt(answer, config.secretKey).toString(),
    });
    await groupQuestion.save();
    const targets = (await GroupMember.find({ group: groupQuestion.group }).exec())
      .map((doc) => doc.user)
      .filter((doc) => doc.toString() !== user._id.toString());

    const notiPayload = makeNotiPayload(NotiKinds.ReplyQuestion, targets, {
      user: user.name,
      questionNumber: groupQuestion.number,
    });
    await sendNoti({ payload: notiPayload });

    await Group.updateOne({ _id: groupQuestion.group.toString() }, { $inc: { coin: 3 } });
  } else {
    // eslint-disable-next-line no-param-reassign
    groupQuestion.answers[answerIdx].contents = AES.encrypt(answer, config.secretKey).toString();
    await groupQuestion.save();
  }

  const question = await GroupQuestion.findById(groupQuestion._id);

  const memberCnt = await GroupMember.countDocuments();

  if (question.answers.length === memberCnt) {
    question.allReplied = true;
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
