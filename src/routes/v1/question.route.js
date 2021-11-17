const express = require('express');
const { questionController } = require('../../controllers');

const router = express.Router();

router.post('/', questionController.createQuestion);

module.exports = router;
