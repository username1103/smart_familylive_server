const express = require('express');
const { questionController } = require('../../controllers');

const router = express.Router();

router.post('/', questionController.createQuestion);

router.get('/:qus_id', questionController.getQuestion);

module.exports = router;
