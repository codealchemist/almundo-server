'use strict'

const hotelsMock = require('./hotel-search.mock')

/**
 * HotelService provides the low level api into hotels data models.
 * It returns raw data consumed by other app components.
 * Doesn't know anything about the web server.
 *
 */
module.exports = class HotelService {
  search (terms, filter) {
    console.log('[ HotelService.search ]--> returning hotels mock')
    console.log('[ HotelService.search ]--> filter:', filter)

    // apply filter if set
    if (filter) {
      return {
        hotels: this.filter(hotelsMock.hotels, filter)
      }
    }

    // no filter, return complete mock
    return hotelsMock
  }

  filter (hotels, filter) {
    return hotels.filter((hotel) => {
      // name matcher
      if (filter.name) {
        const regex = new RegExp(filter.name, 'i')
        if (!hotel.name.match(regex)) return
      }

      // price min matcher
      if (filter.priceMin) {
        if (hotel.price.amount < filter.priceMin) return
      }

      // price max matcher
      if (filter.priceMax) {
        if (hotel.price.amount > filter.priceMax) return
      }

      // stars matcher
      if (filter.stars) {
        if (filter.stars.indexOf(hotel.stars) === -1) return
      }

      // all filters passed!
      // return this hotel
      return hotel
    })
  }
}
