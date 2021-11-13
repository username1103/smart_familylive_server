const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.put('/:userId', validate(userValidation.updateUser), userController.updateUser);

router
  .route('/')
  .post(auth, validate(userValidation.createUser), userController.createUser)
  .get(auth, validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth, validate(userValidation.getUser), userController.getUser)
  .patch(auth, validate(userValidation.updateUser), userController.updateUser)
  .delete(auth, validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 관리
 */

/**
 * @swagger
 * /users/{usr_id}:
 *   get:
 *     summary: 유저 정보 얻기
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: usr_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 */

/**
 * @swagger
 * /users/{usr_id}/device-token:
 *   post:
 *     summary: 푸쉬알림을 위한 유저 디바이스 토큰 저장
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: usr_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *
 */

/**
 * @swagger
 * /users/{usr_id}/device-token:
 *   delete:
 *     summary: 디바이스 토큰 제거
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: usr_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *
 */
