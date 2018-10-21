const express = require('express');
const router  = express.Router();
const Planet = require('../models/planets');
const User = require('../models/users');

router.get('/',  async (req, res) => {
    res.render('game/index.ejs', {planets});
});

module.exports = router;
