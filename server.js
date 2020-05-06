import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes/index'
import Settings from './config'
import { responseHelper, clientErrors } from './middleware/response.middleware'

/** Connect With MongoDB */
mongoose.connect(`${Settings.mongo.url}/${Settings.mongo.db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

/** Initialize Express App */
const app = express();

/** Apply CORS Middleware */
app.use(cors())

/** Apply BodyParser Middleware */
app.use(bodyParser.json())

/** Response Helpers */
app.use(responseHelper)

/** Initialize API Routes */
app.use('/api', routes)

/** Handle Errors */
app.use(clientErrors)

/**
 *  Server Configuration
*/
app.listen(Settings.port, () => {
  console.log(`App is Running on Port: ${Settings.port}`)
})
