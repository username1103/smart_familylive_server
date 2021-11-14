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

module.exports = { createGroup, getGroup, getGroupByCode };
