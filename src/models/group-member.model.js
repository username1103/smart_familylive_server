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
      required: true,
      enum: Object.values(FamilyRole),
    },
    statusMesaage: {
      type: String,
      required: true,
      default: '',
    },
    food: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      required: false,
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
