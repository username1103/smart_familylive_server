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

/**
 * @swagger
 * tags:
 *   name: CustomQuestion
 *   description: 커스텀 질문 관리
 */

/**
 * @swagger
 * /custom-questions:
 *   post:
 *     summary: 커스텀 질문 추가
 *     tags: [CustomQuestion]
 *     security:
 *       - bearerAuth: []
 */
/**
 * @swagger
 * /custom-questions/{customQuestionId}:
 *   get:
 *     summary: 커스텀 질문 조회
 *     tags: [CustomQuestion]
 *     security:
 *       - bearerAuth: []
 */
