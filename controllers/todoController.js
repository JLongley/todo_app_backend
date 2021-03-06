'use strict'

const Todo = require('../models/todo')

const createTodo = function (req, res, next) {
  Todo.create({
    value: req.body.value,
    done: req.body.done
  }, (err, todo) => {
    if (err) { return next(err) }
    res.send(todo)
  })
}

const deleteTodo = function (req, res, next) {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) { return next(err) }
    res.status(204).send()
  })
}

const readTodo = function (req, res, next) {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      return res.status(404).send('Todo not found', err)
    }
    res.send(todo)
  })
}

const readTodos = function (req, res, next) {
  Todo.find({}, (err, todos) => {
    if (err) { return next(err) }
    res.send(todos)
  })
}

const updateTodo = function (req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, {
    value: req.body.value,
    done: req.body.done
  }, (err, todo) => {
    if (err) { return next(err) }
    res.send(todo)
  })
}

module.exports = {
  createTodo: createTodo,
  deleteTodo: deleteTodo,
  readTodo: readTodo,
  readTodos: readTodos,
  updateTodo: updateTodo
}
