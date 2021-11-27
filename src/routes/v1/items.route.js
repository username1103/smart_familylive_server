const express = require('express');
const { itemController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', itemController.createItem);
router.get('/', auth, itemController.gets);

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
