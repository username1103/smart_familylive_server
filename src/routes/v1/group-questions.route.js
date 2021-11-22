const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { groupQuestionController } = require('../../controllers');
const { groupQuestionVlidation } = require('../../validations');

const router = express.Router();

router.get(
  '/:grp_qus_id',
  auth,
  validate(groupQuestionVlidation.getGroupQuestion),
  groupQuestionController.getGroupQuestion
);
router.put('/:grp_qus_id/answer', auth, validate(groupQuestionVlidation.answer), groupQuestionController.reply);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: GroupQuestions
 *   description: 그룹(가족) 질문 관리
 */

/**
 * @swagger
 * /group-questions/{grp_qus_id}:
 *   get:
 *     summary: 질문 내용 조회
 *     tags: [GroupQuestions]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /group-questions/{grp_qus_id}/answer:
 *   put:
 *     summary: 질문 답변 작성
 *     tags: [GroupQuestions]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /group-questions/{grp_qus_id}/comment:
 *   post:
 *     summary: 댓글 작성
 *     tags: [GroupQuestions]
 *     security:
 *       - bearerAuth: []
 */
