const express = require('express')
const bodyParse = require('body-parser')
const routes = require('./Routes')
const app = express()

app.use(bodyParse.json())

routes(app)

module.exports = app