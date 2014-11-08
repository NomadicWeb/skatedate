var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('gif-part-one', { title : 'Home' });
});

module.exports = router;
