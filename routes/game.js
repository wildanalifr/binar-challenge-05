var express = require('express');
var router = express.Router();

const dataImgs = [
    { img: '/assets/chapter-04/batu.png' },
    { img: '/assets/chapter-04/kertas.png' },
    { img: '/assets/chapter-04/gunting.png' }
]

router.get('/', function (req, res, next) {
    res.render('game', { title: 'Game', dataImgs });
});

module.exports = router;
