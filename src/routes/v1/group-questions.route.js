const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { groupQuestionController } = require('../../controllers');
const { groupQuestionValidation } = require('../../validations');

const router = express.Router();

router.get(
  '/:groupQuestionId',
  auth,
  validate(groupQuestionValidation.getGroupQuestion),
  groupQuestionController.getGroupQuestion
);
router.put('/:groupQuestionId/answer', validate(groupQuestionValidation.answer), groupQuestionController.reply);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: GroupQuestions
 *   description: 그룹(가족) 질문 관리
 */

/**
 * @swagger
 * /group-questions/{groupQuestionId}:
 *   get:
 *     summary: 질문 내용 조회
 *     tags: [GroupQuestions]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /group-questions/{groupQuestionId}/answer:
 *   put:
 *     summary: 질문 답변 작성
 *     tags: [GroupQuestions]
 *     security:
 *       - bearerAuth: []
 */
