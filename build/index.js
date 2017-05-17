'use strict'

const fs = require('fs')
const path = require('path')

const insideA = require('./inside-a')
const insideB = require('./inside-b')
const insideC = require('./inside-c')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const writeJSON = (file, data) => {
	return new Promise((yay, nay) => {
		const dest = path.join(__dirname, '..', file)
		fs.writeFile(dest, JSON.stringify(data), (err) => {
			if (err) nay(err)
			else yay()
		})
	})
}

insideA()
.then((insideA) => {
	console.error('Berlin A', insideA.length)
	return writeJSON('a.json', insideA)
})
.catch(showError)

// todo: subtract

insideB()
.then((insideB) => {
	console.error('Berlin B', insideB.length)
	return writeJSON('b.json', insideB)
})
.catch(showError)

insideC()
.then((insideC) => {
	console.error('Berlin C', insideC.length)
	return writeJSON('c.json', insideC)
})
.catch(showError)
