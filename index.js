//file , packages etc import
const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 4000
const urlRoutes = require("./routes/urlRoutes")
const errorHandler = require('./middleware/errorHandler')

const connectDB = require("./config/connectDB")


//MIDDLWARE
app.use(express.json())

//ROUTES

app.use('/url',urlRoutes)






app.use(errorHandler)

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
