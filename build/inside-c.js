'use strict'

const floor = require('floordate')
const createQueue = require('queue')
const createHafas = require('vbb-hafas')
const stations = require('vbb-stations')

const hour = 60 * 60 * 1000
const week = 7 * 24 * hour
const when = new Date(+floor(new Date(), 'week') + week + 7 * hour) // next Monday
const friedrichstr = '900000100001'

const hafas = createHafas('vbb-fare-zones build')

const checkIfABCTicket = (stationId) => {
	try {
		return hafas.journeys(stationId, friedrichstr, {
			depature: when, results: 1, stopovers: true, tickets: true
		})
		.then(([journey]) => {
			if (!Array.isArray(journey.tickets)) {
				const err = new Error('journey has no tickets')
				err.isUserError = true
				throw err
			}

			return !!journey.tickets.some(t => t.coverage === 'ABC')
		})
		.catch((err) => {
			err.message = stationId + ': ' + err.message
			throw err
		})
	} catch (err) {
		err.message = stationId + ': ' + err.message
		return Promise.reject(err)
	}
}

const insideC = (insideA, insideB) => {
	return new Promise((resolve, reject) => {
		const queue = createQueue({concurrency: 8, autostart: true})
		const insideC = []
		queue.once('end', () => resolve(insideC))
		queue.on('error', (err) => {
			console.error(err.isHafasError || err.isUserError ? err.message : err)
		})

		const checkIfInside = (stationId) => (cb) => {
			checkIfABCTicket(stationId)
			.then((hasABCTicket) => {
				if (hasABCTicket) insideC.push(stationId)
				cb()
			})
			.catch(cb)
		}

		for (let s of stations('all')) {
			if (insideA.includes(s.id) || insideB.includes(s.id)) continue
			queue.push(checkIfInside(s.id))
		}
	})
}

module.exports = insideC
