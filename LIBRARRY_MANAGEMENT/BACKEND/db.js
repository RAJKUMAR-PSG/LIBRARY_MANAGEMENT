const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://raj:raj@cluster0.cfvhftj.mongodb.net/LIBRARY").then(() =>{
    console.log('Database connected..')
})
    
