const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getGroupQuestion = {
  params: Joi.object().keys({
    grp_qus_id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getGroupQuestion,
};
