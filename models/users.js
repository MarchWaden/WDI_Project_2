const mongoose = require('mongoose');
const Photo = require('./photos');

const userSchema = new mongoose.Schema ({
    name:  String, 
    planets: [Planet.schema]
})

module.exports = mongoose.model('User', userSchema);