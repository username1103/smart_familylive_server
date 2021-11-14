const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const groupSchema = mongoose.Schema(
  {
    questionTime: {
      type: String,
      required: true,
      default: '21:00',
    },
    coin: {
      type: Number,
      required: true,
      default: 0,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'start'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
groupSchema.plugin(toJSON);
groupSchema.plugin(paginate);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
