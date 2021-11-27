const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { presignS3Object } = require('../config/aws-s3');
const ApiError = require('../utils/ApiError');

const file = catchAsync(async (req, res) => {
  if (req.file === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'need file');
  }

  const tempUrl = presignS3Object(req.file.key);

  res.status(httpStatus.CREATED).send({
    key: req.file.key,
    tempUrl,
  });
});

module.exports = {
  file,
};
