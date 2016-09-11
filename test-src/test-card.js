/* global describe, it */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.should()
chai.use(chaiAsPromised)

const { card } = require('../lib/index.js')
const { pipe, prop } = require('ramda')

describe('card', () => {
  describe('find', () => {
    it('returns card', () => {
      return card.find('xy7-57').then(pipe(prop('card'), card => {
        card.should.have.property('id', 'xy7-57')
        card.should.have.property('name', 'Giratina-EX')
        card.should.have.property('nationalPokedexNumber', 487)
        card.should.have.property('imageUrl', 'https://s3.amazonaws.com/pokemontcg/xy7/57.png')
        card.should.have.property('subtype', 'EX')
        card.should.have.property('supertype', 'Pokémon')
        card.should.have.deep.property('ability.name', 'Renegade Pulse')
        card.should.have.deep.property('ability.text', "Prevent all effects of attacks, including damage, done to this Pokémon by your opponent's Mega Evolution Pokémon.")
        card.should.have.property('hp', '170')
        card.should.have.deep.property('retreatCost[0]', 'Colorless')
        card.should.have.property('number', '57')
        card.should.have.property('artist', 'PLANETA')
        card.should.have.property('rarity', 'Rare Holo EX')
        card.should.have.property('series', 'XY')
        card.should.have.property('set', 'Ancient Origins')
        card.should.have.property('setCode', 'xy7')
        card.should.have.deep.property('types[0]', 'Dragon')
      }))
    })
  })

  describe('where', () => {
    it('should filter', () => {
      return card.where({ set: 'steam siege' })
        .should.eventually.be.an('array')
        .with.deep.property('[0]')
          .that.has.property('set', 'Steam Siege')
    })

    it('should return 1 page of results', () => {
      return Promise.all([
        card.where({})
          .should.eventually.be.an('array')
          .that.has.length(100),
        card.where({ page: 1 })
          .should.eventually.be.an('array')
          .that.has.length(100)
      ])
    })

    it('should be able to control the page size', () => {
      return card.where({ page: 5, pageSize: 1 })
        .should.eventually.be.an('array')
        .that.has.length(1)
    })
  })

  describe('all', () => {
    it('should emit results from multiple pages', (cb) => {
      const results = []
      const cardEmitter = card.all({ name: 'Pikachu', pageSize: 5 })
      cardEmitter.on('data', card => results.push(card))
      cardEmitter.on('error', cb)
      cardEmitter.on('end', () => {
        results.should.have.length.of.at.least(20)
        cb()
      })
    })
  })
})
