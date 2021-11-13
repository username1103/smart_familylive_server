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
 *     summary: DeviceToken 등록
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /devices:
 *   delete:
 *     summary: DeviceToken 제거
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 */
