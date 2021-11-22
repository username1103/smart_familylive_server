const express = require('express');
const { customQuestionController } = require('../../controllers');

const router = express.Router();

router.post('/', customQuestionController.createCustomQuestion);

module.exports = router;
