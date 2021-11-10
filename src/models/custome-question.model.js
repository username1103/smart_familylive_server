const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const customQuestionSchema = mongoose.Schema(
  {
    group: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
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
customQuestionSchema.plugin(toJSON);
customQuestionSchema.plugin(paginate);

const CustomQuestion = mongoose.model('CustomQuestion', customQuestionSchema);

module.exports = CustomQuestion;
