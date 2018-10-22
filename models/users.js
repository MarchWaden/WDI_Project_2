const mongoose = require('mongoose');
const Planet = require('./planets');

const userSchema = new mongoose.Schema ({
    name:  String, 
    planets: [Planet.schema]
})

module.exports = mongoose.model('User', userSchema);