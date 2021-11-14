const { GroupMember } = require('../models');

const insertMember = async ({ groupId, userId }) => {
  return GroupMember.create({ group: groupId, user: userId });
};

const getUserGroup = async ({ userId }) => {
  const result = await GroupMember.findOne({ user: userId });

  return result;
};

const getMembers = async ({ groupId }) => {
  const members = await GroupMember.find({ group: groupId });
  return members;
};

module.exports = { insertMember, getUserGroup, getMembers };
