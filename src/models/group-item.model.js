const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const groupItemSchema = mongoose.Schema(
  {
    group: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    item: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    used: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

// add plugin that converts mongoose to json
groupItemSchema.plugin(toJSON);
groupItemSchema.plugin(paginate);

const GroupItem = mongoose.model('GroupItem', groupItemSchema);

module.exports = GroupItem;
