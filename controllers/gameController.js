const express = require('express');
const router  = express.Router();
const Planets = require('../models/planets');
const User = require('../models/users');


router.get('/planets', async (req, res) => {
  const planets = await Planets.find({});
  console.log(planets);
  let usablePlanets = [];
  for(i=0;i<planets.length;i++){
    let user = await User.findById(planets[i].user);
      let planet = {
        name: planets[i].name,
        x: planets[i].x,
        y: planets[i].y,
        about: planets[i].about,
        creator: user.username,
        image: planets[i].image
      }
      usablePlanets.push(planet);
  }
  res.send(usablePlanets);
});

router.get('/', (req, res) => {
    res.render('game/game.ejs');
});

module.exports = router;
