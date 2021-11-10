const express = require('express');

const router = express.Router();

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: GroupMembers
 *   description: 그룹(가족) 멤버 관리
 */

/**
 * @swagger
 * /group-members/{grp_mem_id}:
 *   delete:
 *     summary: 그룹 멤버 삭제
 *     tags: [GroupMembers]
 *     security:
 *       - bearerAuth: []
 */
