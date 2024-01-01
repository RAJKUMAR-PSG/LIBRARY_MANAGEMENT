const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    book :{
        type : String,
        required : true
    },
    bookcount : {
        type : Number,
        required : true
    },
    author : {
        type : String,
        required : true
    }
})
const bookCol = mongoose.model('bookCol',bookSchema)
module.exports = bookCol