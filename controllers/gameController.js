const express = require('express');
const router  = express.Router();
const Planets = require('../models/planets');
const User = require('../models/users');

router.get('/', (req, res) => {
    res.render('game/game.ejs');
});

module.exports = router;
