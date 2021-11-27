const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuid } = require('uuid');
const httpStatus = require('http-status');
const aws = require('aws-sdk');
const tk = require('timekeeper');
const config = require('./config');
const ApiError = require('../utils/ApiError');

const { accessKeyId, secretAccessKey, region, bucket } = config.s3;

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
  region,
});

const mimeToExt = (mime) => {
  switch (mime) {
    case 'image/png':
      return 'png';

    case 'image/jpeg':
      return 'jpeg';

    default:
      throw new Error('Unexpected mime');
  }
};

const isAllowedMime = (mime) => {
  switch (mime) {
    case 'image/jpeg':
    case 'image/png':
    case 'image/svg':
      return true;
    default:
      return false;
  }
};

const uploadS3 = multer({
  storage: multerS3({
    s3,
    acl: 'private',
    bucket,
    // metadata: (req, fild, cb) => {
    //
    // },
    key: (req, file, cb) => {
      try {
        const mime = file.mimetype;

        // Check whether it's allowed.
        if (!isAllowedMime(mime)) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'invalid type');
        }

        // Get appropriate extension.
        const ext = mimeToExt(mime);

        // Send final s3 object name.
        cb(null, `${uuid()}.${ext}`);
      } catch (e) {
        cb(e);
      }
    },
  }),
});

const presignedS3ObjectDuration = 24 * 60 * 60;
const getTruncatedTime = () => {
  const currentTime = new Date();
  const d = new Date(currentTime);

  d.setHours(Math.floor(d.getHours() / 12) * 12, 0, 0, 0);

  return d;
};
const presignS3Object = (key) =>
  tk.withFreeze(getTruncatedTime(), () => {
    return s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: key,
      Expires: presignedS3ObjectDuration,
    });
  });

module.exports = {
  uploadS3,
  presignS3Object,
};
