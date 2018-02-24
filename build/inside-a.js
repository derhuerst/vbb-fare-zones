'use strict'

const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const stations = require('vbb-stations')
const {point} = require('@turf/helpers')
const inside = require('@turf/boolean-point-in-polygon').default

const exceptions = require('../exceptions').insideA

const insideA = () => {
	return fetch('https://gist.githubusercontent.com/derhuerst/9a3fca091cb1d48ad0b28743f86676c4/raw/49f58aa9325834b877166afdbf20eff2cc72aaa3/berlin-s-bahn-ring.geojson', {
		redirect: 'follow'
	})
	.then((res) => {
		if (!res.ok) throw new Error('response not ok')
		return res.json()
	})
	.then((sBahnRing) => {
		const insideA = Array.from(exceptions)

		for (let s of stations('all')) {
			const p = point([s.location.longitude, s.location.latitude])
			if (inside(p, sBahnRing)) insideA.push(s.id)
		}

		return insideA
	})
}

module.exports = insideA
