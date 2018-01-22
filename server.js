'use strict'

require('./db')

const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const expressValidator = require('express-validator')
const morgan = require('morgan')

const PORT = process.env.PORT || 3001

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(expressValidator())
app.use(morgan('common'))

app.get('/', (req, res) => {
  res.send('ok')
})

const routes = require('./routes/routes')
app.use('/api', routes)

// development error handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send('error', {
      message: err.message,
      error: err
    })
  })
}

// no stacktrace in prod
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send('error', {
    message: err.message,
    error: {}
  })
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
