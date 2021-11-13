const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    user: Joi.string().required(),
    deviceToken: Joi.string().required(),
    modelName: Joi.string().required(),
  }),
};

const remove = {
  query: Joi.object().keys({
    user: Joi.string().required(),
    deviceToken: Joi.string().required(),
  }),
};

module.exports = {
  register,
  remove,
};
