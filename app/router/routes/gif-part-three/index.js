var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('gif-part-three', { title : 'Home' });
});

module.exports = router;
