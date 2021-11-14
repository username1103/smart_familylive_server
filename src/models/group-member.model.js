const mongoose = require('mongoose');
const FamilyRole = require('../utils/FamilyRole');
const { toJSON, paginate } = require('./plugins');

const groupMemberSchema = mongoose.Schema(
  {
    group: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      default: '',
      required: false,
      enum: Object.values(FamilyRole),
    },
  },
  {
    timestamp: true,
  }
);

// add plugin that converts mongoose to json
groupMemberSchema.plugin(toJSON);
groupMemberSchema.plugin(paginate);

const GroupMember = mongoose.model('GroupMember', groupMemberSchema);

module.exports = GroupMember;
