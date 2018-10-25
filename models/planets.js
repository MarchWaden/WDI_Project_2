const mongoose = require('mongoose');
const Users = require('./users')

const planetSchema = new mongoose.Schema ({
    name: {
      type: String,
      required: true,
      unique: true
    },
    about: String,
    x: Number,
    y: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    image: Number
})

module.exports = mongoose.model('Planet', planetSchema);
