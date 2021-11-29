const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});

const swaggerOptions = {
  swaggerOptions: {
    operationsSorter: (a, b) => {
      const methodsOrder = ['post', 'put', 'patch', 'get', 'delete', 'options', 'trace'];
      let result = methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));

      if (result === 0) {
        result = a.get('path').localeCompare(b.get('path'));
      }

      return result;
    },
  },
  explorer: true,
};

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, swaggerOptions));

module.exports = router;
