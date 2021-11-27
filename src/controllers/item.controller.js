const httpStatus = require('http-status');
const { presignS3Object } = require('../config/aws-s3');
const { Item } = require('../models');
const catchAsync = require('../utils/catchAsync');

const createItem = catchAsync(async (req, res) => {
  const { name, contents, price, image } = req.body;
  await Item.create({
    name,
    contents,
    price,
    image,
  });

  res.status(httpStatus.CREATED).send();
});

const gets = catchAsync(async (req, res) => {
  const items = await Item.find();

  res
    .status(httpStatus.OK)
    .send({ items: items.map((item) => item.toObject()).map((item) => ({ ...item, image: presignS3Object(item.image) })) });
});

module.exports = { createItem, gets };
