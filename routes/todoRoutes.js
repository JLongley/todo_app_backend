'use strict'

const express = require('express')
const router = express.Router()

const { check } = require('express-validator/check')

const todoController = require('../controllers/todoController')

router.get('/', todoController.readTodos)
router.get('/:id', todoController.readTodo)

router.post('/',
  check('done').exists(),
  check('value').exists(),
  todoController.createTodo)

router.put('/:id',
  check('done').exists(),
  check('value').exists(),
  todoController.updateTodo)

router.delete('/:id', todoController.deleteTodo)

module.exports = router
