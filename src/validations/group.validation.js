const Joi = require('joi');
const { objectId } = require('./custom.validation');

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

const getQuestion = {
  params: Joi.object().keys({
    groupId: Joi.string().required(),
  }),
};

const updateGroupTime = {
  params: Joi.object().keys({
    groupId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    time: Joi.string().required(),
    groupItemId: Joi.string().custom(objectId),
  }),
};

const buyItem = {
  params: Joi.object().keys({
    groupId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    itemId: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

const getItems = {
  params: Joi.object().keys({
    groupId: Joi.string().required(),
  }),
};

module.exports = {
  createGroup,
  getGroup,
  getMember,
  getQuestion,
  updateGroupTime,
  buyItem,
  getItems,
};
