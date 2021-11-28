const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { customQuestionController } = require('../../controllers');
const { customQuestionValidation } = require('../../validations');

const router = express.Router();

router.post('/', auth, customQuestionController.createCustomQuestion);

router.get(
  '/:customQuestionId',
  auth,
  validate(customQuestionValidation.getCustomQuestion),
  customQuestionController.getCustomQuestion
);

module.exports = router;
