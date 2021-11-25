const schedule = require('node-schedule');
const moment = require('moment-timezone');
const { groupService, notiService } = require('../services');
const { GroupQuestion, Question, CustomQuestion, GroupMember } = require('../models');
const QuestionTypes = require('../utils/QuestionTypes');
const { NotiKinds } = require('../utils/NotiKinds');

module.exports = schedule.scheduleJob('0 0 0/1 * * *', async () => {
  const nowTime = moment().tz('Asia/Seoul').format('HH:00');

  const groups = await groupService.getGroupByTime(nowTime);

  await Promise.all(
    groups.map(async (group) => {
      const question = await GroupQuestion.findOne({ group: group._id, questionType: QuestionTypes.Normal }).sort({
        createdAt: -1,
      });

      let nextQuestion;
      if (question === null) {
        nextQuestion = await Question.findOne({ number: 1 });
      } else {
        const questioninfo = await Question.findById(question.question);
        nextQuestion = await Question.findOne({ number: { $gt: questioninfo.number } }).sort({ number: 1 });
      }

      const nextCustomQuestion = await CustomQuestion.findOne({ group: group._id, isUsed: false }).sort({ createdAt: 1 });

      if (nextCustomQuestion !== null) {
        nextQuestion = nextCustomQuestion;
      }

      if (nextQuestion === null) {
        return;
      }

      const number = await GroupQuestion.countDocuments({ group: group._id });

      if (nextQuestion.isUsed === false) {
        await GroupQuestion.create({
          group: group._id,
          question: nextQuestion._id,
          questionType: QuestionTypes.Custom,
          allReplied: false,
          number: number + 1,
        });
        // eslint-disable-next-line no-param-reassign
        nextQuestion.isUsed = true;
        await nextQuestion.save();
      } else {
        await GroupQuestion.create({
          group: group._id,
          question: nextQuestion._id,
          questionType: QuestionTypes.Normal,
          allReplied: false,
          number: number + 1,
        });
      }

      const targets = (await GroupMember.find({ group: group._id }).exec()).map((doc) => doc.user);
      const notiPayload = notiService.makeNotiPayload(NotiKinds.SendQuestion, targets);
      await notiService.sendNoti({ payload: notiPayload });
    })
  );
});
