const express = require('express');
const { Router } = express;
const router = Router();
const app = express();

// router.post('/social-login', CoffeeAuthController.socialLogin);
// Use Admin Routes
const AdminRoutes = require('./admin-routes');
router.use('/admin', AdminRoutes);

const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphQl/schema');

router.use('/coffee', graphqlHTTP({
  schema: schema,
}));


app.use('/coffee', (req, res) => {
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    customFormatErrorFn(err) {
      console.log('err', err);
      res.status(500).json({
        ...err
      });
    },
  })(req, res);
}).listen(4000);


console.log('Running a GraphQL API server at http://localhost:4000/coffee');
module.exports = router;