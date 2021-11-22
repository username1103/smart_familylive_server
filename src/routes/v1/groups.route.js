const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { groupContorller } = require('../../controllers');
const { groupValidation } = require('../../validations');

const router = express.Router();

router.post('/', auth, validate(groupValidation.createGroup), groupContorller.createGroup);
router.get('/:groupId', auth, validate(groupValidation.getGroup), groupContorller.getGroup);
router.get('/:groupId/members', auth, validate(groupValidation.getMember), groupContorller.getMembers);
router.get('/:groupId/questions', auth, validate(groupValidation.getQuestion), groupContorller.getQuestions);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: 그룹(가족) 관리
 */

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: 그룹 생성 및 그룹 코드 생성
 *     tags: [Groups]
 */

/**
 * @swagger
 * /groups/{grp_id}:
 *   get:
 *     summary: 그룹 정보 조회
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{grp_id}/questions:
 *   get:
 *     summary: 그룹 질문 목록 조회
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{grp_id}/items:
 *   get:
 *     summary: 그룹 아이템 목록 조회
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{grp_id}/members:
 *   get:
 *     summary: 그룹 멤버 목록 조회
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/apply:
 *   post:
 *     summary: 그룹 가입
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups:
 *   delete:
 *     summary: 그룹 삭제
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */
