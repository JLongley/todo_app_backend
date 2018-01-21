'use strict'

const _ = require('lodash')
const express = require('express')
const router = express.Router()

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

router.get('/', (req, res) => {
  res.send(todos)
})

router.post('/', (req, res) => {
  if (!req.body.done || !req.body.value) {
    const error = {
      status: 400,
      message: `Missing 'done' or 'value' parameter`
    }
    console.error(`ERROR: ${error.message}`)
    return res.status(400).send(error)
  }

  const newTodo = {
    id: id++,
    value: req.body.value,
    done: req.body.done
  }
  todos.push(newTodo)

  console.log('Added new todo', newTodo)
  res.status(201).send(newTodo)
})

router.put('/:id', (req, res) => {
  if (!req.body.done || !req.body.value || !req.body.id) {
    const error = {
      status: 400,
      message: `Missing 'done', 'id', or 'value' parameter`
    }
    console.error(`ERROR: ${error.message}`)
    return res.status(400).send(error)
  }
  const todo = _.find(todos, (todo) => todo.id == req.params.id)
  console.log(todos, todo)
  if (!todo) {
    const error = {
      status: 404,
      message: `todo ${req.params.id} not found`
    }
    console.error(`ERROR: ${error.message}`)
    return res.status(404).send(error)
  }
  todo.value = req.body.value
  todo.done = req.body.done

  res.send(todo)
})

router.delete('/:id', (req, res) => {
  todos = todos.filter((todo) => todo.id != req.params.id)
  res.status(204).send()
})

module.exports = router
