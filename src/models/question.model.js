const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionSchema = mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    contents: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
