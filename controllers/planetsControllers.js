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
        const planet = await Planet.create(req.body);
        user.planets.push(planet);
        await user.save();
        console.log("REDIRECTING TO PLANETS")
        res.redirect('/planets');
    } catch(err){
        console.log(err);
        res.send(err);
    }
})
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({'planets._id': req.params.id});
        const planet = await Planet.findById(req.params.id);
        res.render('planets/show.ejs', {user, planet});
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
router.get('/:id/edit', async (req, res) => {
    try{
        const users = await User.find({});
        const planet = await Planet.findById(req.params.id);
        res.render('planets/edit.ejs', {users, planet});
    } catch(err){
        res.send(err)
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
        const newUser = await User.findOne({'_id': req.body.userId});
        const planet = await Planet.findById(req.params.id);
        const oldUser = await User.findOne({'planets._id': planet._id})
        await Planet.findByIdAndUpdate(req.params.id, req.body);
        for (let i = 0; i < oldUser.planets.length; i++){
            if (`${oldUser.planets[i]._id}` === `${planet._id}`){
                await oldUser.planets.splice(i, 1);
            }
        }
        newUser.planets.push(planet);
        await newUser.save();
        await oldUser.save();
        res.redirect(`/planets/${req.params.id}`)
    } catch(err){
        res.send(err);
    }
})

module.exports = router;
