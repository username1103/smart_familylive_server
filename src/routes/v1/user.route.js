const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.put('/:userId', auth, validate(userValidation.updateUser), userController.updateUser);
router.put('/:userId/images', auth, validate(userValidation.updateImage), userController.updateImage);
router.get('/:userId/groups', auth, validate(userValidation.getGroup), userController.getUserGroup);
router.post('/:userId/register-code', auth, validate(userValidation.registerCode), userController.registerCode);
router.post('/:userId/click', auth, validate(userValidation.clickuser), userController.click);
router.get(':userId', auth, validate(userValidation.getUser), userController.getUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 관리
 */

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: 유저 정보 수정
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /users/{userId}/images:
 *   put:
 *     summary: 유저 썸네일 수정
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /users/{userId}/groups:
 *   get:
 *     summary: 유저가 속한 그룹 조회
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /users/{userId}/register-code:
 *   post:
 *     summary: 가족 코드 등록
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /users/{userId}/click:
 *   post:
 *     summary: 콕 찌르기
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: 유저 정보 얻기
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
