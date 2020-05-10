const { Router } = require('express');
const router = Router();

router.get('/awesome-slider1', function (req, res) {
    res.status(200).json({hello: "WORKDL"});
});
module.exports = router;