const express = require('express');
const { questionController } = require('../../controllers');

const router = express.Router();

router.post('/', questionController.createQuestion);

router.get('/:qus_id', questionController.getQuestion);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: 질문 관리
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: 질문 추가
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 */
/**
 * @swagger
 * /questions/{questionId}:
 *   get:
 *     summary: 특정 질문 조회
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 */
