const Joi = require('joi');

const createGroup = {
  body: Joi.object().keys({
    user: Joi.string().required(),
  }),
};

const getGroup = {
  params: Joi.object().keys({
    groupId: Joi.string().required(),
  }),
};

const getMember = {
  params: Joi.object().keys({
    groupId: Joi.string().required(),
  }),
};

module.exports = {
  createGroup,
  getGroup,
  getMember,
};
