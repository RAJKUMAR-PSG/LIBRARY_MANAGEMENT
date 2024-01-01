const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3001

require('../BACKEND/db')



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...   `)
})

const route=require("../BACKEND/router")
app.use(route)

