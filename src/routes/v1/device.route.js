const express = require('express');
const { deviceController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { deviceValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.put('/', auth, validate(deviceValidation.register), deviceController.register);
router.delete('/', auth, validate(deviceValidation.remove), deviceController.remove);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: DeviceToken 관리
 */

/**
 * @swagger
 * /devices:
 *   put:
 *     summary: 푸쉬알림을 위한 유저 디바이스 토큰 저장
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *
 *
 */

/**
 * @swagger
 * /devices:
 *   delete:
 *     summary: 디바이스 토큰 제거
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *
 *
 */
