const Mongoose = require('mongoose')

module.exports = class DataAccess {
  static connect () {
    const options = { promiseLibrary: global.Promise }
    if (this.mongooseInstance)
      return this.mongooseInstance

    this.mongooseConnection = Mongoose.connection
    this.mongooseConnection.once('open', () => {
      console.log('Conectado ao mongodb.')
    })
    this.mongooseInstance = Mongoose
      .connect('mongodb://localhost/tdd-node', options)
    return this.mongooseInstance
  }
}
