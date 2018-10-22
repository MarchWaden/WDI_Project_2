const mongoose = require('mongoose');
const Planet = require('./planets');

const userSchema = new mongoose.Schema ({
    username:  {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    planets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Planet'}]
})

module.exports = mongoose.model('User', userSchema);
