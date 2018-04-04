const mongoose = require('mongoose')
require('dotenv').config()

beforeAll(done => mongoose.connect('mongodb://localhost/tdd-node', done))
afterAll(done => mongoose.connection.dropDatabase(done))