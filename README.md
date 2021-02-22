# Pokémon TCG SDK

*Now Supporting Version 2 of the Pokémon TCG API!*

[![pokemontcg-developers on discord](https://img.shields.io/badge/discord-pokemontcg--developers-738bd7.svg)](https://discord.gg/dpsTCvg)
[![npm version](https://badge.fury.io/js/pokemontcgsdk.svg)](https://badge.fury.io/js/pokemontcgsdk)
[![Build Status](https://travis-ci.org/PokemonTCG/pokemon-tcg-sdk-javascript.svg?branch=master)](https://travis-ci.org/PokemonTCG/pokemon-tcg-sdk-javascript)

This is the Pokémon TCG SDK Javascript implementation. It is a wrapper around the Pokémon TCG API of [pokemontcg.io](http://pokemontcg.io/).

## Installation

    npm install --save pokemontcgsdk

## Usage

### Configuration

```js
import pokemon from 'pokemontcgsdk'

pokemon.configure({apiKey: '123abc'})
```

### Cards

#### Get a single card by ID
```js
pokemon.card.find('base1-4')
.then(card => {
    console.log(card.name) // "Charizard"
})
```

#### Filter cards via the q parameter
```js
pokemon.card.where({ q: 'name:blastoise' })
.then(result => {
    console.log(result.data[0].name) // "Blastoise"
})
```

#### Filter cards via the q parameter and specific page
```js
pokemon.card.where({ q: 'name:blastoise', pageSize: 10, page: 3 })
.then(result => {
    console.log(result.data[0].name) // "Blastoise"
})
```

#### Automatically page through card data

```js
pokemon.card.all({ q: 'name:blastoise' })
    .then((cards) => {
        console.log(cards[0].name) // "Blastoise"
    })
```

Using the `all` function, pagination happens automatically, and the result will simply contain the data and no pagination info.

### Sets

#### Get a single set by ID
```js
pokemon.set.find('base1')
.then(set => {
    console.log(set.name) // "Base"
})
```

#### Filter sets via the q parameter
```js
pokemon.set.where({ q: 'series:base' })
.then(result => {
    console.log(result.data[0].name) // "Base"
})
```

#### Filter cards via the q parameter and specific page
```js
pokemon.set.where({ q: 'series:base', pageSize: 1, page: 1 })
.then(result => {
    console.log(result.data[0].name) // "Base"
})
```

#### Automatically page through card data

```js
pokemon.set.all({ q: 'series:base' })
    .then((cards) => {
        console.log(cards[0].name) // "Base"
    })
```

Using the `all` function, pagination happens automatically, and the result will simply contain the data and no pagination info.

### Supertypes

```js
pokemon.supertype.all()
```

### Subtypes

```js
pokemon.subtype.all()
```

### Types

```js
pokemon.type.all()
```

### Rarity

```js
pokemon.rarity.all()
```

Please refer to https://docs.pokemontcg.io for more information on query syntax and what fields are available.

### Development

- ([nwb](https://github.com/insin/nwb))

Build tasks are in npm scripts:

    npm run build
    npm run test
