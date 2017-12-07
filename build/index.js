'use strict'

const fs = require('fs')
const path = require('path')
const so = require('so')
const difference = require('lodash.difference')

const insideA = require('./inside-a')
const insideB = require('./inside-b')
const insideC = require('./inside-c')

const writeJSON = (file, data) => {
	return new Promise((yay, nay) => {
		const dest = path.join(__dirname, '..', file)
		fs.writeFile(dest, JSON.stringify(data), (err) => {
			if (err) nay(err)
			else yay()
		})
	})
}

so(function* () {
	const A = yield insideA()
	console.error('Berlin A', A.length)
	yield writeJSON('a.json', A)

	const B = difference(yield insideB(), A)
	console.error('Berlin B', B.length)
	yield writeJSON('b.json', B)

	const C = yield insideC(A, B)
	console.error('Berlin C', C.length)
	yield writeJSON('c.json', C)
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
