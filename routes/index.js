const { Router } = require('express');
const router = Router();

// router.post('/social-login', CoffeeAuthController.socialLogin);
// Use Admin Routes
const AdminRoutes = require('./admin-routes');
// Use Coffee Routes
// const CoffeeRoutes = require('./coffee-routes');
router.use('/admin', AdminRoutes);
const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphQl/schema');

router.use('/coffee', graphqlHTTP({
    schema: schema,
    graphiql: true,
    playground: {
        settings: {
            'editor.theme': 'dark',
        },
    },
}));

module.exports = router;