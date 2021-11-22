const schedule = require('node-schedule');
const moment = require('moment');
const { groupService, groupQuestionService } = require('../services');
const { GroupQuestion, Question, CustomQuestion } = require('../models');

module.exports = schedule.scheduleJob('0 0/1 * * * *', async () => {
  const nowTime = moment().format('HH:00');
  console.log(nowTime);

  const groups = await groupService.getGroupByTime(nowTime);
  console.log(groups);

  const groupQuestions = await Promise.all(
    groups.map((group) => groupQuestionService.getNotAllRepliedGroupQuestionByGroup(group._id))
  );
  console.log('groupQuestions', groupQuestions);

  const notAllRepliedGroupQuestionsCnt = groupQuestions.map((groupQuestion) => groupQuestion.length);
  console.log('notAllRepliedGroupQuestionsCnt', notAllRepliedGroupQuestionsCnt);

  const questionCandidateGroup = groups.filter((group, idx) => notAllRepliedGroupQuestionsCnt[idx] < 2);
  console.log('questionCandidateGroup', questionCandidateGroup);

  const questions = await Promise.all(
    questionCandidateGroup.map((group) => GroupQuestion.findOne({ group: group._id }).sort({ number: -1 }))
  );
  console.log('questions', questions);

  const nextQuestions = await Promise.all(
    questions.map((question) => {
      if (question === null) {
        return Question.findOne().sort({ number: 1 });
      }
      return Question.findOne({ number: { $gt: question.number } }).sort({ number: 1 });
    })
  );
  console.log('nextQuestions', nextQuestions);

  const nextCustomQuestions = await Promise.all(
    questionCandidateGroup.map((group) =>
      CustomQuestion.findOne({ group: group._id, isUsed: false }).sort({ createdAt: -1 })
    )
  );
  console.log('nextCustomQuestions', nextCustomQuestions);

  const validNextQuestions = nextQuestions.map((nextQuestion, idx) => {
    if (nextCustomQuestions[idx] !== null) {
      return nextCustomQuestions[idx];
    }
    return nextQuestion;
  });
  console.log('validNextQuestions', validNextQuestions);

  // const validNextQuestions = nextQuestions.map((nextQuestion, idx) => {});
});
