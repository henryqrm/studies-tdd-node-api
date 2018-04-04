
const mongoose = require('mongoose')
const app = require('./App')
const dataAccess = require('./config/DataAccess')

const PORT = 9000

try {
    dataAccess.connect()
    app.listen(PORT, () => console.log(`Serving in : ${PORT}`))
} catch (error) {
    console.log(error)
}