const { Router } = require('express');
const router = Router();
const upload = require('../config/FileSystem');
const AdminAuthMiddleware = require('../middlewares/Admin/Auth');
// Admin Controllers
const AuthController = require('../controllers/Admin/AuthController');
const AwesomeSliderController = require('../controllers/Admin/AwesomeSliderController');
const InfoController = require('../controllers/Admin/InfoController');
const OurHistoryController = require('../controllers/Admin/OurHistoryController');
// Admin Routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/verify-token', AuthController.verifyAdminToken);
//
router.get('/awesome-slider', AdminAuthMiddleware, AwesomeSliderController.get);
router.put('/awesome-slider', AdminAuthMiddleware, upload.single('image'), AwesomeSliderController.update);
router.get('/info', AdminAuthMiddleware, InfoController.get);
router.put('/info-update', AdminAuthMiddleware, InfoController.update);
router.put('/info/upload-icon', AdminAuthMiddleware,  InfoController.uploadIcon);
router.get('/our-history', AdminAuthMiddleware, OurHistoryController.get);
router.put('/our-history', AdminAuthMiddleware, upload.single('image'), OurHistoryController.update);
//
module.exports = router;