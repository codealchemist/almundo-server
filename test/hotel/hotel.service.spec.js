const chai = require('chai')
const expect = chai.expect

// ------------------------------

const HotelService = require('../../src/modules/hotel/hotel.service')
const hotelsMock = require('../../src/modules/hotel/hotel-search.mock')
const hotelService = new HotelService()

describe('HotelService', function (done) {
  it('should be defined', function () {
    expect(hotelService).to.not.be.undefined
  })

  it('should return search results', function () {
    const results = hotelService.search('a test')
    expect(results).to.eql(hotelsMock)
  })

  it('should return filtered search results', function () {
    const filter = {
      name: 'petit'
    }
    const results = hotelService.search('a test', filter)
    expect(results.hotels.length).to.equal(1)
    expect(results.hotels[0]).to.equal(hotelsMock.hotels[1])
  })

  it('should filter by name', function () {
    const data = [
      {name: 'rock'},
      {name: 'metal'},
      {name: 'jazz'}
    ]

    expect(hotelService.filter(data, {name: 'rock'})).to.eql([data[0]])
    expect(hotelService.filter(data, {name: 'metal'})).to.eql([data[1]])
    expect(hotelService.filter(data, {name: 'jazz'})).to.eql([data[2]])
  })

  it('should filter by min price', function () {
    const data = [
      {price: {amount: 10}},
      {price: {amount: 20}},
      {price: {amount: 30}}
    ]

    expect(hotelService.filter(data, {priceMin: 30})).to.eql([data[2]])
    expect(hotelService.filter(data, {priceMin: 20})).to.eql([data[1], data[2]])
    expect(hotelService.filter(data, {priceMin: 10})).to.eql(data)
    expect(hotelService.filter(data, {priceMin: 31})).to.eql([])
  })

  it('should filter by max price', function () {
    const data = [
      {price: {amount: 10}},
      {price: {amount: 20}},
      {price: {amount: 30}}
    ]

    expect(hotelService.filter(data, {priceMax: 30})).to.eql(data)
    expect(hotelService.filter(data, {priceMax: 20})).to.eql([data[0], data[1]])
    expect(hotelService.filter(data, {priceMax: 10})).to.eql([data[0]])
    expect(hotelService.filter(data, {priceMax: 9})).to.eql([])
  })

  it('should filter by price range', function () {
    const data = [
      {price: {amount: 10}},
      {price: {amount: 20}},
      {price: {amount: 30}}
    ]

    expect(hotelService.filter(data, {priceMin: 10, priceMax: 30})).to.eql(data)
    expect(hotelService.filter(data, {priceMin: 20, priceMax: 30})).to.eql([data[1], data[2]])
    expect(hotelService.filter(data, {priceMin: 15, priceMax: 25})).to.eql([data[1]])
    expect(hotelService.filter(data, {priceMin: 25, priceMax: 35})).to.eql([data[2]])
    expect(hotelService.filter(data, {priceMin: 30, priceMax: 35})).to.eql([data[2]])
    expect(hotelService.filter(data, {priceMin: 35, priceMax: 40})).to.eql([])
  })

  it('should filter by stars', function () {
    const data = [
      {stars: 5},
      {stars: 4},
      {stars: 3},
      {stars: 2},
      {stars: 1}
    ]

    expect(hotelService.filter(data, {stars: [5]})).to.eql([data[0]])
    expect(hotelService.filter(data, {stars: [4]})).to.eql([data[1]])
    expect(hotelService.filter(data, {stars: [5, 4]})).to.eql([data[0], data[1]])
    expect(hotelService.filter(data, {stars: [4, 2, 1]})).to.eql([data[1], data[3], data[4]])
    expect(hotelService.filter(data, {stars: [6]})).to.eql([])
  })
})
