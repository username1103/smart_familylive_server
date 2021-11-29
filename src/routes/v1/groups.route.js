const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { groupContorller } = require('../../controllers');
const { groupValidation } = require('../../validations');

const router = express.Router();

router.post('/', auth, validate(groupValidation.createGroup), groupContorller.createGroup);
router.post('/:groupId/items', auth, validate(groupValidation.buyItem), groupContorller.buyItem);
router.get('/:groupId', auth, validate(groupValidation.getGroup), groupContorller.getGroup);
router.get('/:groupId/members', auth, validate(groupValidation.getMember), groupContorller.getMembers);
router.get('/:groupId/questions', auth, validate(groupValidation.getQuestion), groupContorller.getQuestions);
router.get('/:groupId/items', auth, validate(groupValidation.getItems), groupContorller.getItems);
router.put('/:groupId/time', auth, validate(groupValidation.updateGroupTime), groupContorller.updateGroupTime);
router.post(
  '/:groupId/custom-question',
  auth,
  validate(groupValidation.createCustomQuestion),
  groupContorller.createCustomQuestion
);

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
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{groupId}/items:
 *   post:
 *     summary: 아이템 구매
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{groupId}:
 *   get:
 *     summary: 그룹 정보 조회
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{groupId}/questions:
 *   get:
 *     summary: 그룹 질문 목록 조회
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{groupId}/items:
 *   get:
 *     summary: 그룹 아이템 목록 조회
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{groupId}/members:
 *   get:
 *     summary: 그룹 멤버 목록 조회
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{groupId}/time:
 *   put:
 *     summary: 그룹 질문 시간 변경
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /groups/{groupId}/custom-question:
 *   post:
 *     summary: 커스텀 질문 작성
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 */
