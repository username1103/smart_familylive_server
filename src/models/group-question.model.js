const mongoose = require('mongoose');
const QuestionTypes = require('../utils/QuestionTypes');
const { toJSON, paginate } = require('./plugins');

const answerSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    emotion: {
      type: String,
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

const commentSchema = mongoose.Schema(
  {
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

const groupQuestionSchema = mongoose.Schema(
  {
    group: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    question: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    questionType: {
      type: String,
      required: true,
      enum: Object.values(QuestionTypes),
      default: 'normal',
    },
    allReplied: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      required: true,
    },
    answers: [answerSchema],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
groupQuestionSchema.plugin(toJSON);
groupQuestionSchema.plugin(paginate);

const GroupQuestion = mongoose.model('GroupQuestion', groupQuestionSchema);

module.exports = GroupQuestion;
