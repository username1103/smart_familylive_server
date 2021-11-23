const { Group } = require('../models');

const createGroup = async ({ code }) => {
  const group = await Group.create({ code });

  return group;
};

const getGroup = async ({ groupId }) => {
  return Group.findById(groupId);
};

const getGroupByCode = async ({ code }) => {
  const group = await Group.findOne({ code });
  return group;
};

const getGroupByTime = async (time) => {
  return Group.find({ questionTime: time });
};

const updateGroupTime = async (groupId, time) => {
  return Group.updateOne({ _id: groupId }, { questionTime: time });
};
module.exports = { createGroup, getGroup, getGroupByCode, getGroupByTime, updateGroupTime };
