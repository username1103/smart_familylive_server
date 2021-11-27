const Joi = require('joi');
const { objectId } = require('./custom.validation');

const buyItem = {
  body: Joi.object().keys({
    item: Joi.string().custom(objectId),
  }),
};

module.exports = {
  buyItem,
};
