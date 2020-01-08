import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import 'express-async-errors'

// const configData = require('./utils/config')
import configData from './utils/config'
import apiRouter from './routes/api_router'
import { ResponseCode } from './commons/const/response_consts'
import ErrorResponse from './commons/response_models/error_response'

const app = express()

const connectDatabase = async () => {
    try {
        const uri = `mongodb://${configData.db.host}/${configData.db.dbName}?authSource=${configData.db.dbName}`
        const mongodbOptions = {
            //https://mongoosejs.com/docs/connections.html
            user: configData.db.username,
            pass: configData.db.password,
            dbName: configData.db.dbName,
            connectTimeoutMS: 10000,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 20,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }
        await mongoose.connect(uri, mongodbOptions)
        console.log('connect mongo database succesfully!!!')
    } catch (error) {
        console.log(`Cannot connect to database error: ${error}`)
    }
}
connectDatabase()

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/v1', apiRouter)
//handle 404
app.use((req, res, next) => {
    const responseBody = new ErrorResponse(
        ResponseCode.NOT_FOUND,
        'End-point not found'
    )
    console.error(responseBody)
    res.status(ResponseCode.NOT_FOUND).json(responseBody)
})
//handle error
app.use((error, req, res, next) => {
    console.error(error)
    const { statusCode, bodyCode, message, errors } = error
    const responseBody = new ErrorResponse(statusCode, message, errors)
    res.status(statusCode || ResponseCode.INTERNAL_SERVER_ERROR).json(
        responseBody
    )
})

app.listen(configData.port, () => {
    console.log(`App listenning on port ${configData.port}`)
})

export default app
