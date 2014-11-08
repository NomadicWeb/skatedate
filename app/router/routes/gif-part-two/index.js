var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('gif-part-two', { title : 'Home' });
});

module.exports = router;
