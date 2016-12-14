'use strict'

module.exports = (app, config) => {
  // Each module defines its own routing.
  // By setting up these routes for each module the module
  // becomes active. This sets a 1:1 relation between a route
  // and a module.
  // Pass app and config to each route configurator.
  require('./modules/hotel/hotel.routes')(app, config)

  // Global routes, independent from modules.
  app.get('/about', (req, res) => {
    const packageData = require('../package.json')
    res
      .status(200)
      .json(packageData)
  })
}
