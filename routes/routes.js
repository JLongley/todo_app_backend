'use strict'

const express = require('express')
const router = express.Router()

const todoRoutes = require('./todoRoutes')

router.use('/todos', todoRoutes)

module.exports = router
