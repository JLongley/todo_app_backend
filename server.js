'use strict'

const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan')

const PORT = process.env.PORT || 3001

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(compression())
app.use(morgan('common'))

let todos = [{
  id: 123,
  value: 'one two three',
  done: false
},
{
  id: 122,
  value: 'one two three',
  done: false
}]
let id = todos.reduce((maxId, todo) => {
  return Math.max(maxId, todo.id)
}, 0) + 1

app.get('/', (req, res) => {
  res.send('Use the API dummy')
})

app.get('/api/todos/', (req, res) => {
  res.send(todos)
})

app.post('/api/todos/', (req, res) => {
  if (!req.body.done || !req.body.value) {
    const error = {
      status: 400,
      message: `Missing 'done' or 'value' parameter`
    }
    console.error(`ERROR: ${error.message}`)
    return res.status(500).send(error)
  }

  const newTodo = {
    id: id++,
    value: req.body.value,
    done: req.body.done
  }
  todos.push(newTodo)

  console.log('Added new todo', newTodo)
  res.send(newTodo)
})

app.listen(3001, () => { console.log(`Listening on port ${PORT}`) })
