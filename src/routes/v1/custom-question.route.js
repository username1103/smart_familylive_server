const express = require('express');
const { customQuestionController } = require('../../controllers');

const router = express.Router();

router.post('/', customQuestionController.createCustomQuestion);

router.get('/:qus_id', customQuestionController.getCustomQuestion);

module.exports = router;
