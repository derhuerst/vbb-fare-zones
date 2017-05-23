# vbb-fare-zones

[![Greenkeeper badge](https://badges.greenkeeper.io/derhuerst/vbb-fare-zones.svg)](https://greenkeeper.io/)

**All VBB stations and their fare zones.** Berlin C zone as well as other cities are still missing.

This list is generated from [`vbb-stations`](https://github.com/derhuerst/vbb-stations) using shapefiles for the zones. **Actually, information like this should be open data published by [VBB](https://www.vbb.de/).**

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
