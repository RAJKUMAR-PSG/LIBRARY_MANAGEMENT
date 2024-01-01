const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id :{
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
})
const userCol = mongoose.model('userCol',userSchema)
module.exports = userCol


