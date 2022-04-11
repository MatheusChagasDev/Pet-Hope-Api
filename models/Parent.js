const mongoose = require('mongoose')
const { colours } = require('nodemon/lib/config/defaults')

const Parent = mongoose.model('Parent',{
    name: String,
    sex: Array,
    email: String,
    tel: Number,
    birth: String,
    donation: Number,
})

module.exports = Parent