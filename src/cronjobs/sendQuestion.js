const schedule = require('node-schedule');
const moment = require('moment');
const { groupService } = require('../services');
const { GroupQuestion, Question, CustomQuestion } = require('../models');
const QuestionTypes = require('../utils/QuestionTypes');

module.exports = schedule.scheduleJob('0 0/1 * * * *', async () => {
  const nowTime = moment().format('HH:00');

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

      if (nextQuestion.isUsed === false) {
        await GroupQuestion.create({
          group: group._id,
          question: nextQuestion._id,
          questionType: QuestionTypes.Custom,
          allReplied: false,
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
        });
      }

      // To Do: 푸시 알림 전송 추가
    })
  );
});
