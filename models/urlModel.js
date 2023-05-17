const mongoose =require('mongoose')
const moment = require('moment')
const date = moment().format('YYYY-MM-DD hh:mm:ss')


const shortIdSchema = mongoose.Schema({
    shortId:{
        type: String,
        required:true,
        unique:true
    },
    redirectURL:{
        type: String,
        required:true,
    },
    visitHistory:[{timestamp: {type: Number }}]
},{timestamps:true})

module.exports = mongoose.model('URL',shortIdSchema)