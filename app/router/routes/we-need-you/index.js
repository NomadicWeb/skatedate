var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('you', { title : 'Home' });
});

module.exports = router;
