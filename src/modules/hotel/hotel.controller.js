'use strict'

const HotelService = require('./hotel.service')
const hotelService = new HotelService()

/**
 * HotelController validates requests, consumes HotelService
 * and send responses.
 * It's the bindig layer between the model api and the web server.
 * Knows howto handle http requests and responses.
 *
 */
module.exports = class HotelController {
  constructor (app, config) {
    this.app = app
    this.config = config
  }

  search (req, res) {
    req.checkQuery('terms', 'Missing param: terms').notEmpty()
    req.getValidationResult().then((validationResult) => {
      const error = validationResult.useFirstErrorOnly().array()

      // error
      if (error.length) {
        console.log(error)
        res
          .status(400)
          .json(error[0])

        return
      }

      // OK, request is valid
      const terms = req.query.terms
      const filter = this.getFilter(req.query)

      const result = hotelService.search(terms, filter)

      res
        .status(200)
        .json(result)
    })
  }

  getFilter (params) {
    let filter = {}
    if (params.name) filter.name = params.name
    if (params.stars) filter.stars = params.stars.split(',').map((value) => parseInt(value, 10))
    if (params.priceMin) filter.priceMin = parseInt(params.priceMin, 10)
    if (params.priceMax) filter.priceMax = parseInt(params.priceMax, 10)

    if (!Object.keys(filter).length) return null
    return filter
  }
}
