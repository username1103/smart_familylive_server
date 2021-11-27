const express = require('express');
const validate = require('../../middlewares/validate');
const { groupItemValidation } = require('../../validations');

const router = express.Router();

router.post('/group-items', validate(groupItemValidation.buyItem));

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: GroupItems
 *   description: 그룹(가족) 아이템 관리
 */

/**
 * @swagger
 * /group-items:
 *   post:
 *     summary: 아이템 구매
 *     tags: [GroupItems]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /group-items:
 *   get:
 *     summary: 보유한 아이템 목록 조회
 *     tags: [GroupItems]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /group-items/{grp_item_id}:
 *   get:
 *     summary: 특정 아이템 조회
 *     tags: [GroupItems]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /group-items/{grp_item_id}:
 *   put:
 *     summary: 특정 아이템 사용
 *     tags: [GroupItems]
 *     security:
 *       - bearerAuth: []
 */
