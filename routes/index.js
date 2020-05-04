const { Router } = require('express');
const router = Router();
// const CoffeeAuthController = require('../controllers/Coffee/Auth');

// router.post('/awesome-slider', AdminAuthMiddleware, AwesomeSliderController.update);


// router.post('/social-login', CoffeeAuthController.socialLogin);
// Use Admin Routes
const AdminRoutes = require('./admin-routes');
router.use(AdminRoutes);
module.exports = router;