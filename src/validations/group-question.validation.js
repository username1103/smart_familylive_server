const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getGroupQuestion = {
  params: Joi.object().keys({
    grp_qus_id: Joi.string().custom(objectId),
  }),
};

const answer = {
  params: Joi.object().keys({
    grp_qus_id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    answer: Joi.string().required(),
  }),
};
module.exports = {
  getGroupQuestion,
  answer,
};
