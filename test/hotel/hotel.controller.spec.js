const chai = require('chai')
const expect = chai.expect

// ------------------------------

const HotelController = require('../../src/modules/hotel/hotel.controller')
const config = require('../../src/config.json')
const hotelController = new HotelController(config)

describe('HotelController', function (done) {
  // mock express
  const res = {
    setHeader: () => {},
    status: () => {},
    send: () => {
      done()
    }
  }

  it('should be defined', function () {
    expect(hotelController).to.not.be.undefined
  })
})
