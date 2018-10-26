const express = require('express');
const router  = express.Router();
const Planet = require('../models/planets');
const User = require('../models/users');
const requireLogin = require('../middleware/requireLogin')

router.get('/new', requireLogin, async (req, res) => {
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
router.get('/:id/edit', requireLogin, async (req, res) => {
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
router.delete('/:id', requireLogin, async (req, res) => {
    console.log('reached delete')
    try {
        
        console.log('1')
        const planet = await Planet.findById(req.params.id);
        const user = await User.findById(planet.user)
        console.log('2')
        console.log('3')
        await Planet.findByIdAndDelete(req.params.id);
        console.log('4')
        await user.save();
        console.log('5')
        res.redirect('/planets');
        console.log('6')
    } catch(err){
        console.log(err)
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
