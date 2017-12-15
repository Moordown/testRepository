'use strict'
const sr = require('./shareForFindingAlg');

function getSum(string) {
	var sum = 0;
	for(var i=0; i<string.length; i++) {
		sum += +string.charCodeAt(i);
	}
	return sum;
}

const amountOfEntries = Math.min();

function codeSum(string, pattern, numOfEntries = amountOfEntries)
{

	var borderCaseRes = sr.borderCaseProcess(string, pattern);
	if (typeof(borderCaseRes) !== 'undefined')
		return borderCaseRes;

	var internalVar = new sr.Variables(string, pattern, numOfEntries, getSum);

	for(var i=internalVar.patSize; i<=internalVar.strSize && internalVar.numOfEntries > 0; i++){
		internalVar = sr.updateVarState(internalVar, string, pattern, i);
		internalVar.strSum -= internalVar.leftCode;
		internalVar.strSum += +string.charCodeAt(i);
		internalVar.leftCode = string.charCodeAt(internalVar.startID++);
	}
	return new sr.searchResult(internalVar.subStrID.length === 0 ? [-1] : internalVar.subStrID, internalVar.collisions);
}
module.exports.codeSum = codeSum;
module.exports.getSum = getSum;