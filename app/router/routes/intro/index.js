var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('introduction', { title : 'Home' });
});

module.exports = router;
