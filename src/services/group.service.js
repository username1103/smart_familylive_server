const { Group } = require('../models');

const createGroup = async ({ code }) => {
  const group = await Group.create({ code });

  return group;
};

const getGroup = async ({ groupId }) => {
  return Group.findById(groupId);
};

module.exports = { createGroup, getGroup };
