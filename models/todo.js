'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  done: { type: Boolean, required: true },
  value: { type: String, required: true },
  created_at: Date,
  updated_at: Date
})

todoSchema.pre('save', (next) => {
  const now = Date.now()

  if (!this.created_at) {
    this.created_at = now
  }
  this.updated_at = now

  next()
})

module.exports = mongoose.model('Todo', todoSchema)
