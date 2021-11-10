const express = require('express');

const router = express.Router();

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: 아이템 관리
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: 아이템 목록 조회
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 */
