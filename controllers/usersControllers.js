const express = require('express');
const router  = express.Router();
const Planet = require('../models/planets');
const User = require('../models/users');

router.get('/', async (req, res) => {
    try{
        const users = await User.find({});
        res.render('users/index.ejs', {users});
    } catch(err){
        res.send(err);
    }
})
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
})
router.post('/', async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.redirect('/users')
    }catch(err){
        res.send(err);
    }
})
router.get('/:id' , async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('users/show.ejs', {user});
    } catch(err){
        res.send(err);
    }
})
router.delete('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        for (let i = 0; i < user.planets.length; i++){
            await Planet.findByIdAndDelete(user.planets[i]._id);
        }
        await User.findByIdAndDelete(req.params.id)
        res.redirect('/users')
    }catch(err){
        res.send(err);
    }
})



module.exports = router;