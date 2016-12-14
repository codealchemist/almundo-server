'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const morgan = require('morgan')
const http = require('http')
const cors = require('cors')
const app = express()
const path = require('path')
const fs = require('fs')
const config = require('./config')

// print ascii art
const artFile = path.join(__dirname, '/ascii-art.txt')
const art = fs.readFileSync(artFile, 'utf8')
console.info(art)

// set ip and port
const port = process.env.PORT || config.port || process.env.port || 3080

// set port
app.set('port', port)

// set cors options
let corsOptions = null
if (config.cors && config.cors.whitelist && config.cors.whitelist.length) {
  corsOptions = {
    origin: function (origin, callback) {
      if (!origin) return callback('Origin Not Allowed', false)

      const isAllowed = config.cors.whitelist.some((allowedDomain) => {
        return origin.match('^' + allowedDomain)
      })

      // allowed domain
      if (isAllowed) return callback(null, true)

      // not allowed domain
      callback('Origin Not Allowed', false)
    }
  }
}

app.use(cors(corsOptions))
app.use(morgan('dev')) // logger
app.use(bodyParser.json())
app.use(expressValidator())
app.set('json spaces', 2)

// set routes
require('./routes')(app, config)

// start server
http.createServer(app).listen(app.get('port'), function () {
  console.info()
  console.info(`✔ Express server listening at port ${port}`)
  console.info('-'.repeat(80))
})

module.exports = app
