const CryptoJS = require('crypto-js');
const config = require('../config/config');

module.exports = (groupQuestionObject) => ({
  ...groupQuestionObject,
  answers: groupQuestionObject.answers.map((answer) => ({
    ...answer,
    contents: CryptoJS.AES.decrypt(answer.contents, config.secretKey).toString(CryptoJS.enc.Utf8),
  })),
});
