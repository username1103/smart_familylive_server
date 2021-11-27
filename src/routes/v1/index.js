const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const deviceRoute = require('./device.route');
const docsRoute = require('./docs.route');
const groupRoute = require('./groups.route');
const groupQuestionRoute = require('./group-questions.route');
const questionRoute = require('./question.route');
const customQuestionRoute = require('./custom-question.route');
const imageRoute = require('./image.route');
const itemRoute = require('./items.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/devices',
    route: deviceRoute,
  },
  {
    path: '/groups',
    route: groupRoute,
  },
  {
    path: '/group-questions',
    route: groupQuestionRoute,
  },
  {
    path: '/questions',
    route: questionRoute,
  },
  {
    path: '/custom-questions',
    route: customQuestionRoute,
  },
  {
    path: '/images',
    route: imageRoute,
  },
  {
    path: '/items',
    route: itemRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
