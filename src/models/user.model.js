const mongoose = require('mongoose');
const BloodTypes = require('../utils/BloodTypes');
const Genders = require('../utils/Genders');
const FamilyRole = require('../utils/FamilyRole');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    kakaoId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    gender: {
      type: String,
      enum: Object.values(Genders),
      required: false,
    },
    bloodType: {
      type: String,
      enum: Object.values(BloodTypes),
      required: false,
    },
    birthday: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      enum: Object.values(FamilyRole),
    },
    statusMessage: {
      type: String,
      default: '',
    },
    food: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
