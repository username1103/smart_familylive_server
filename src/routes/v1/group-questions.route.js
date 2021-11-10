const express = require('express');

const router = express.Router();

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
 *   post:
 *     summary: 질문 답변 작성
 *     tags: [GroupQuestions]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /group-questions/{grp_qus_id}/answer/{grp_ans_id}:
 *   put:
 *     summary: 질문 답변 수정
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
