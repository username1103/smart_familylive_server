const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
      default: '',
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    purchase_cnt: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
