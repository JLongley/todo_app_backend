'use strict'

const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/todo_app'

mongoose.connect(MONGO_URL).then(
  () => { console.log('Connected to MongoDB') },
  console.error.bind(console, 'MongoDB connection error:')
)
