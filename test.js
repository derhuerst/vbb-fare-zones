'use strict'

const test = require('tape')
const uniq = require('lodash.uniq')
const intersection = require('lodash.intersection')

const index = require('.')
const A = require('./a.json')
const B = require('./b.json')
const C = require('./c.json')



test('*.json should be deep queal to index.js -> *', (t) => {
	t.plan(3)

	t.deepEqual(A, index.A)
	t.deepEqual(B, index.B)
	t.deepEqual(C, index.C)
})

test('all lists should not contain duplicates', (t) => {
	t.plan(Object.keys(index).length)

	for (let zone in index) {
		const list = index[zone]
		t.deepEqual(list, uniq(list))
	}
})

test('all lists should be disjoint with each other', (t) => {
	for (let zoneA in index) {
		const listA = index[zoneA]
		for (let zoneB in index) {
			if (zoneA === zoneB) continue
			const listB = index[zoneB]

			t.deepEqual(intersection(listA, listB), [], zoneA + ' & ' + zoneB)
		}
	}

	t.end()
})

test('A checklist', (t) => {
	t.plan(5)

	t.ok(A.includes('900000100011')) // U Stadtmitte
	t.ok(A.includes('900000009104')) // S+U Wedding, Ringbahn
	t.ok(A.includes('900000026202')) // U Kaiserdamm, actually outside
	t.notOk(A.includes('900000080202')) // U Grenzallee
	t.notOk(A.includes('900000220114')) // S Teltow Stadt
})

test('B checklist', (t) => {
	t.plan(4)

	t.ok(B.includes('900000009202')) // U Osloer Str.
	t.notOk(B.includes('900000009104')) // S+U Wedding, Ringbahn
	t.notOk(B.includes('900000026202')) // U Kaiserdamm, in A
	t.notOk(B.includes('900000220114')) // S Teltow Stadt
})
