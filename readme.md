# vbb-fare-zones

**Boilerplate for modules I write.** Work in progress.

[![npm version](https://img.shields.io/npm/v/vbb-fare-zones.svg)](https://www.npmjs.com/package/vbb-fare-zones)
[![build status](https://img.shields.io/travis/derhuerst/vbb-fare-zones.svg)](https://travis-ci.org/derhuerst/vbb-fare-zones)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-fare-zones.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install vbb-fare-zones
```


## Usage

The [npm package](https://www.npmjs.com/package/vbb-fare-zones) contains a file for each zone. Each file contains an array of [station IDs](https://github.com/derhuerst/vbb-stations#usage).

To get stations of a single zone, require the corresponding file:

```js
const insideA = require('vbb-fare-zones/a.json')

console.log(insideA)
```

To get all zones, require the whole module:

```js
const {A, B, C} = require('vbb-fare-zones')

console.log(A, B, C)
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-fare-zones/issues).
