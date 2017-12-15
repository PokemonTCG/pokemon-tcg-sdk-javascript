/* global describe, it */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.should()
chai.use(chaiAsPromised)

const { set } = require('../lib/index.js')
const { pipe, prop } = require('ramda')

describe('set', () => {
  describe('find', () => {
    it('returns set', () => {
      return set.find('base1').then(pipe(prop('set'), set => {
        set.should.have.property('code', 'base1')
        set.should.have.property('ptcgoCode', 'BS')
        set.should.have.property('name', 'Base')
        set.should.have.property('series', 'Base')
        set.should.have.property('totalCards', 102)
        set.should.have.property('standardLegal', false)
        set.should.have.property('expandedLegal', false)
        set.should.have.property('releaseDate', '01/09/1999')
        set.should.have.property('symbolUrl', 'https://images.pokemontcg.io/base1/symbol.png')
        set.should.have.property('logoUrl', 'https://images.pokemontcg.io/base1/logo.png')
      }))
    })
  })

  describe('where', () => {
    it('should filter', () => {
      return set.where({ totalCards: 102 })
        .should.eventually.be.an('array')
        .with.deep.property('[0]')
          .that.has.property('totalCards', 102)
    })

    it('should return 1 page of results', () => {
      return Promise.all([
        set.where({})
          .should.eventually.be.an('array')
          .that.have.length.of.at.least(90),
        set.where({ page: 1 })
          .should.eventually.be.an('array')
          .that.have.length.of.at.least(90)
      ])
    })

    it('should be able to control the page size', () => {
      return set.where({ page: 5, pageSize: 1 })
        .should.eventually.be.an('array')
        .that.has.length(1)
    })
  })

  describe('all', () => {
    it('should emit results from multiple pages', (cb) => {
      const results = []
      const setEmitter = set.all({ standardLegal: false, pageSize: 5 })
      setEmitter.on('data', set => results.push(set))
      setEmitter.on('error', cb)
      setEmitter.on('end', () => {
        results.should.have.length.of.at.least(10)
        cb()
      })
    })
  })
})
