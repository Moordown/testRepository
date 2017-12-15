const amountOfEntries = Math.min();
const sr = require('./shareForFindingAlg');


function bruteForce(string, pattern, numOfEntries = amountOfEntries) {
	var borderCaseRes = sr.borderCaseProcess(string, pattern);
	if (typeof(borderCaseRes) !== 'undefined')
		return borderCaseRes;
	
	var intSize = pattern.length;
	var subStrID = [];
	for (var i=0; i<string.length - pattern.length + 1 && numOfEntries > 0; i++) {
		if ( pattern === string.slice(i, i+intSize)) {
			subStrID.push(i);
			numOfEntries--;
		}	
	}

	return new sr.searchResult(subStrID.length === 0 ? [-1] : subStrID, 0);
}

module.exports.bruteForce = bruteForce;
