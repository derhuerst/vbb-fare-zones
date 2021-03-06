'use strict'

const states = require('german-administrative-areas/laender.geo.json')
const stations = require('vbb-stations')
const {point} = require('@turf/helpers')
const inside = require('@turf/boolean-point-in-polygon').default

const exceptions = require('../exceptions').insideB

const berlin = states.find((s) => s.properties && s.properties.GEN === 'Berlin')

const insideB = () => {
	const insideB = Array.from(exceptions)

	for (let s of stations('all')) {
		const p = point([s.location.longitude, s.location.latitude])
		if (inside(p, berlin)) insideB.push(s.id)
	}

	return Promise.resolve(insideB)
}

module.exports = insideB
