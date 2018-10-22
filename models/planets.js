const mongoose = require('mongoose');


const planetSchema = new mongoose.Schema ({
    name: {
      type: String,
      required: true,
      unique: true
    },
    user: String,
    img: String,
    about: String,

})

module.exports = mongoose.model('Planet', planetSchema);
