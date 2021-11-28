const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getCustomQuestion = {
  params: Joi.object().keys({
    customQuestionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getCustomQuestion,
};
