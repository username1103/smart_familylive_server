const { GroupMember, User } = require('../models');

const insertMember = async ({ groupId, userId }) => {
  await GroupMember.updateOne({ group: groupId, user: userId }, { group: groupId, user: userId }, { upsert: true });

  await User.updateOne({ _id: userId }, { isMatched: true });
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
