'use strict'

const floor = require('floordate')
const {journeys} = require('vbb-hafas')
const queue = require('queue')
const stations = require('vbb-stations')

const friedrichstrasse = '900000100001'

const minute = 60 * 1000
const hour = 60 * minute
// next day 10 am
const when = new Date(+floor(new Date(), 'day') + 10 * hour)

const insideC = () => {
	const q = queue({concurrency: 4, timeout: 8 * 1000, autostart: true})

	stations('all').forEach((s) => {
		q.push((cb) => {
			journeys(friedrichstrasse, s.id, {when, results: 1, tickets: true})
			.then(([journey]) => {
				// todo: journey.tickets
				cb()
			})
			.catch(cb)
		})
	})

	// todo: return collected data on end

	return Promise.resolve([])
}

module.exports = insideC
