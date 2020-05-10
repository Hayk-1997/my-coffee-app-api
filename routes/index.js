const { Router } = require('express');
const router = Router();

// router.post('/social-login', CoffeeAuthController.socialLogin);
// Use Admin Routes
const AdminRoutes = require('./admin-routes');
// Use Coffee Routes
const CoffeeRoutes = require('./coffee-routes');
router.use(AdminRoutes);
router.use(CoffeeRoutes);

module.exports = router;