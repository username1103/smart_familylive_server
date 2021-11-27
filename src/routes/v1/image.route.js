const express = require('express');
const auth = require('../../middlewares/auth');
const fileController = require('../../controllers/file.controller');
const { uploadS3 } = require('../../config/aws-s3');

const router = express.Router();

router.post('/', auth, uploadS3.single('file'), fileController.file);

module.exports = router;
