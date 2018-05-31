/**
 * Import Modules
 */
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import mung from 'express-mung'
 
/**
 * Import Configuration Files
 */
import settings from './app/config/settings'
import routes from './app/routes/index'

/**
 * Set Application Configuration
 */
const app = express()
app.use(bodyParser.json())
app.use(mung.json(
    function transform(body, req, res) {
        body.mungMessage = "I intercepted you!";
        return body;
    }
))
app.use('/api', routes)
  
/**
 * Make Connection to Server
 */
mongoose.connect(settings.DB_URI, (err, database) => {
    if (err) return console.log(err)

    app.listen(settings.PORT, () => {
        console.log(`App is Running on Port ${settings.PORT}`)
    })
})
