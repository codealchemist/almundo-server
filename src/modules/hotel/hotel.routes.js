'use strict'

const HotelController = require('./hotel.controller')

module.exports = (app, config) => {
  const hotel = new HotelController(app, config)

  app.get('/hotel/search', (req, res) => { hotel.search(req, res) })
}
