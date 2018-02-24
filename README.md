# Pokémon TCG SDK

[![pokemontcg-developers on discord](https://img.shields.io/badge/discord-pokemontcg--developers-738bd7.svg)](https://discord.gg/dpsTCvg)
[![Build Status](https://travis-ci.org/PokemonTCG/pokemon-tcg-sdk-javascript.svg?branch=master)](https://travis-ci.org/PokemonTCG/pokemon-tcg-sdk-javascript)

This is the Pokémon TCG SDK Javascript implementation. It is a wrapper around the Pokémon TCG API of [pokemontcg.io](http://pokemontcg.io/).

## Installation

    npm install --save pokemontcgsdk

## Usage

```js
const pokemon = require('pokemontcgsdk')

pokemon.card.find('base1-4')
.then(result => {
    console.log(result.card.name) // "Charizard"
})
```

Query cards by any property:

```js
card.where({ supertype: 'pokemon', subtype: 'mega' })
.then(cards => {
    console.log(cards[0].name) // "M Sceptile-EX"
})
```

Retrieve cards across multiple pages of results:

```js
card.all({ name: 'blastoise', pageSize: 1 })
.on('data', card => {
    console.log(card.name)
})

// Will print:
// Blastoise
// Blastoise-EX
// M Blastoise-EX
// ....
```

### Properties

#### Card

    id
    name
    nationalPokedexNumber
    imageUrl
    subtype
    supertype
    ability
    ancientTrait
    hp
    number
    artist
    rarity
    series
    set
    setCode
    retreatCost
    text
    types
    attacks
    weaknesses
    resistances

#### Set

    code
    name
    series
    totalCards
    standardLegal
    releaseDate

### Development

- es6 ([babel](https://babeljs.io))
- [standardjs](http://standardjs.com)
- [promises](https://www.promisejs.org)

Build tasks are in npm scripts:

    npm run build
    npm run watch
    npm run test
