const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deviceTokenSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    deviceToken: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
deviceTokenSchema.plugin(toJSON);
deviceTokenSchema.plugin(paginate);

const DeviceToken = mongoose.model('DeviceToken', deviceTokenSchema);

module.exports = DeviceToken;
