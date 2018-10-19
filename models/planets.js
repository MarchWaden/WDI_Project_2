const mongoose = require('mongoose');


const planetSchema = new mongoose.Schema ({
    user:  String, 
    img: String,
    about: String,

})

module.exports = mongoose.model('Planet', planetSchema);