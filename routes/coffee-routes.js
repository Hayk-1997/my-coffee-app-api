const { Router } = require('express');
const router = Router();
const AwesomeSliderController = require('../controllers/Coffee/AwesomeSliderController');

router.get('/awesome-slider', AwesomeSliderController.get);
module.exports = router;