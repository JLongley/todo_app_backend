'use strict'

require('./db')

const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const PORT = process.env.PORT || 3001

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(compression())
app.use(morgan('common'))

app.get('/', (req, res) => {
  res.send('ok')
})

const routes = require('./routes/routes')
app.use('/api', routes)

app.listen(3001, () => { console.log(`Listening on port ${PORT}`) })
