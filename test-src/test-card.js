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
        card.should.deep.equal({
          id: 'xy7-57',
          name: 'Giratina-EX',
          nationalPokedexNumber: 487,
          imageUrl: 'https://images.pokemontcg.io/xy7/57.png',
          imageUrlHiRes: 'https://images.pokemontcg.io/xy7/57_hires.png',
          types: ['Dragon'],
          supertype: 'Pokémon',
          subtype: 'EX',
          ability:
          {
            name: 'Renegade Pulse',
            text: 'Prevent all effects of attacks, including damage, done to this Pokémon by your opponent\'s Mega Evolution Pokémon.',
            type: 'Ability'
          },
          hp: '170',
          retreatCost: ['Colorless', 'Colorless', 'Colorless'],
          number: '57',
          artist: 'PLANETA',
          rarity: 'Rare Holo EX',
          series: 'XY',
          set: 'Ancient Origins',
          setCode: 'xy7',
          text:
            ['When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards.'],
          attacks:
          [{
            cost: ['Grass', 'Psychic', 'Colorless', 'Colorless'],
            name: 'Chaos Wheel',
            text: 'Your opponent can\'t play any Pokémon Tool, Special Energy, or Stadium cards from his or her hand during his or her next turn.',
            damage: '100',
            convertedEnergyCost: 4
          }],
          weaknesses: [{ type: 'Fairy', value: '×2' }]
        })
      }))
    })
  })

  describe('where', () => {
    it('should filter', () => {
      return card.where({ set: 'ancient origins' })
        .should.eventually.be.an('array')
        .should.eventually.deep.include({
          id: 'xy7-57',
          name: 'Giratina-EX',
          nationalPokedexNumber: 487,
          imageUrl: 'https://images.pokemontcg.io/xy7/57.png',
          imageUrlHiRes: 'https://images.pokemontcg.io/xy7/57_hires.png',
          types: ['Dragon'],
          supertype: 'Pokémon',
          subtype: 'EX',
          ability:
          {
            name: 'Renegade Pulse',
            text: 'Prevent all effects of attacks, including damage, done to this Pokémon by your opponent\'s Mega Evolution Pokémon.',
            type: 'Ability'
          },
          hp: '170',
          retreatCost: ['Colorless', 'Colorless', 'Colorless'],
          number: '57',
          artist: 'PLANETA',
          rarity: 'Rare Holo EX',
          series: 'XY',
          set: 'Ancient Origins',
          setCode: 'xy7',
          text:
            ['When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards.'],
          attacks:
          [{
            cost: ['Grass', 'Psychic', 'Colorless', 'Colorless'],
            name: 'Chaos Wheel',
            text: 'Your opponent can\'t play any Pokémon Tool, Special Energy, or Stadium cards from his or her hand during his or her next turn.',
            damage: '100',
            convertedEnergyCost: 4
          }],
          weaknesses: [{ type: 'Fairy', value: '×2' }]
        })
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
