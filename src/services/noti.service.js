const { expo } = require('../config/expo');
const logger = require('../config/logger');
const { DeviceToken } = require('../models');
const { NotiKinds } = require('../utils/NotiKinds');

const makeNotiPayload = (kind, targets = [], data = undefined, createdAt = new Date()) => {
  return { kind, targets, createdAt, ...data };
};

const expoPayload = async ({ payload, target }) => {
  const { kind } = payload;

  switch (kind) {
    case NotiKinds.SendQuestion:
      return {
        to: target,
        title: '슬기로운 가족생활',
        body: '오늘의 질문이 도착했어요! 지금 바로 확인해주세요.',
        data: payload,
      };
    default:
      throw new Error(`Unexprected noti kind for push, ${kind}`);
  }
};

const sendNoti = async ({ payload }) => {
  try {
    const userTokens = [];
    (
      await Promise.all(payload.targets.map((target) => DeviceToken.find({ user: target }, { deviceToken: 1 }).exec()))
    ).forEach((docs) => docs.forEach((doc) => userTokens.push(doc.deviceToken)));

    const messages = await Promise.all(userTokens.map((target) => expoPayload({ payload, target })));

    const chunks = expo.chunkPushNotifications(messages);
    await Promise.all(chunks.map((chunk) => expo.sendPushNotificationsAsync(chunk)));
  } catch (e) {
    logger.error(e.message);
  }
};

module.exports = {
  makeNotiPayload,
  sendNoti,
};
