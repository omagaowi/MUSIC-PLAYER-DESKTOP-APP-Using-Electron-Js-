
const express = require('express')
const app = express()

module.exports = app.use(express.static('static'))
app.use('/audio', express.static('C:/Users/omaga/Music'))

