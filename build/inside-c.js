'use strict'

const floor = require('floordate')
const createQueue = require('queue')
const {journeys} = require('vbb-hafas')
const stations = require('vbb-stations')

const hour = 60 * 60 * 1000
const week = 7 * 24 * hour
const when = new Date(+floor(new Date(), 'week') + week + 7 * hour) // next Monday
const friedrichstr = '900000100001'

const isCTicket = t => t.coverage === 'ABC'

const insideC = (insideA, insideB) => {
	return new Promise((resolve, reject) => {
		const queue = createQueue({concurrency: 8, autostart: true})
		const insideC = []

		const checkIfInside = (stationId) => (cb) => {
			try {
				journeys(stationId, friedrichstr, {
					when, results: 1, tickets: true
				})
				.catch((err) => {
					err.message = stationId + ': ' + err.message
					throw err
				})
				.then(([journey]) => {
					if (!Array.isArray(journey.tickets)) {
						return cb(new Error(stationId + ': journey has no tickets'))
					}
					const abcTicket = journey.tickets.some(isCTicket)
					if (abcTicket) insideC.push(insideC)
					cb()
				})
				.catch(cb)
			} catch (err) {}
		}

		for (let s of stations('all')) {
			if (insideA.includes(s.id) || insideB.includes(s.id)) continue
			queue.push(checkIfInside(s.id))
		}
		queue.on('error', (err) => {
			console.error(err.message || ('' + err))
		})
		queue.once('end', () => resolve(insideC))
	})
}

module.exports = insideC
