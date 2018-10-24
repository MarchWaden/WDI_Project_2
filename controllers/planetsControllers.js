const express = require('express');
const router  = express.Router();
const Planet = require('../models/planets');
const User = require('../models/users');

router.get('/new', async (req, res) => {
    try {
        const users = await User.find({})
        res.render('planets/new.ejs', {users});
    } catch(err){
        res.send(err);
    }
})
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        req.body.user = res.locals.user
        const planet = await Planet.create(req.body);
        user.planets.push(planet._id);
        await user.save();
        console.log("REDIRECTING TO PLANETS")
        res.redirect('/planets');
    } catch(err){
        console.log(err);
        res.send(err);
    }
})
router.get('/:id/edit', async (req, res) => {
    try{
        const users = await User.find({});
        const planet = await Planet.findById(req.params.id);
        console.log(`this is planet: ${planet}`);
        console.log(`this is planet.user: ${planet.user}`);
        console.log(res.locals.user._id)
        if(`${res.locals.user._id}` == `${planet.user}`){
            res.render('planets/edit.ejs',{users, planet});
        } else {
            console.log('if check failed')
        res.redirect(`/planets/${req.params.id}`);
        }
    } catch(err){
        res.send(err)
    }
})
router.get('/:id', async (req, res) => {
    try {
        const creator = await User.findOne({'planets': req.params.id});
        console.log(creator)
        const planet = await Planet.findById(req.params.id);
        res.render('planets/show.ejs', {creator, planet});
    } catch(err){
        res.send(err);
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOne({'planets._id': req.params.id});
        const planet = await Planet.findById(req.params.id);
        user.planets.id(req.params.id).remove();
        await Planet.findByIdAndDelete(req.params.id);
        await user.save();
        res.redirect('/planets');
    } catch(err){
        res.send(err);
    }
})

router.get('/',  async (req, res) => {
    try {
        const planets = await Planet.find({});
        console.log("PLANET INDEX")
        res.render('planets/index.ejs', {planets});
    } catch(err){
        res.send(err);
    }
})
router.put('/:id', async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id)
        planet.name = req.body.name
        planet.about = req.body.about
        planet.x  = req.body.x
        planet.y = req.body.y
        await planet.save()
        res.redirect(`/planets/${req.params.id}`)
    } catch(err){
        res.send(err);
    }
})

module.exports = router;
