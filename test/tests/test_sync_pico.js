'use strict';
let multiHashing = require('../../build/Release/cryptonight-hashing');
let fs = require('fs');
let lineReader = require('readline');

let testsFailed = 0, testsPassed = 0;
let lr = lineReader.createInterface({
	input: fs.createReadStream('./test/tests/data/cryptonight_pico.txt')
});
lr.on('line', (line) => {
	let line_data = line.split(/ (.+)/);
	let result = multiHashing.cryptonight_pico(Buffer.from(line_data[1], 'hex')).toString('hex');
	if (line_data[0] !== result){
		console.error(line_data[1] + ': ' + result);
		testsFailed += 1;
	} else {
		testsPassed += 1;
	}
});
lr.on('close', () => {
	if (testsFailed > 0){
		console.log(testsFailed + '/' + (testsPassed + testsFailed) + ' tests failed on: cryptonight_pico');
	} else {
		console.log(testsPassed + ' tests passed on: cryptonight_pico');
	}
});
lr.on('error', (err) => console.log('cryptonight_pico', err));
