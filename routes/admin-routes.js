const { Router } = require('express');
const router = Router();
const upload = require('../config/FileSystem');
const AdminAuthMiddleware = require('../middlewares/Admin/Auth');
// Admin Controllers
const AuthController = require('../controllers/Admin/AuthController');
const AwesomeSliderController = require('../controllers/Admin/AwesomeSliderController');


// Admin Routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/verify-token', AuthController.verifyAdminToken);
//
router.get('/awesome-slider', AdminAuthMiddleware, AwesomeSliderController.get);
router.put('/awesome-slider', AdminAuthMiddleware, upload.single('image'), AwesomeSliderController.update);
//
module.exports = router;