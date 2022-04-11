const mongoose = require('mongoose')
const { colours } = require('nodemon/lib/config/defaults')

const Pet = mongoose.model('Pet',{
    breed: String,
    sex: String,
    fur: String,
    color: String,
    rescue: String,
    health: String,
    size: Array,
    collar: Array,
    bath: String,
    owner: String,
})

module.exports = Pet