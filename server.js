// Import Modules
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// Import Configuration Files
import settings from './app/config/settings'
import routes from './app/routes/index'

// Set App Configuration
const app = express()
app.use(bodyParser.json())
app.use('/api', routes)

// Make a Connection to Server
mongoose.connect(settings.DB_URI, (err, database) => {
    if (err) return console.log(err)

    app.listen(settings.PORT, () => {
        console.log(`App is Running on Port ${settings.PORT}`)
    })
})
