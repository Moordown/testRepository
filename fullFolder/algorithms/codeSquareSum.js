'use strict';
const sr = require('./shareForFindingAlg');

require('./shareForStringObject');

const amountOfEntries = Math.min();

function getSquareSum(string){
	var sum = 0;
	for(var i=0; i<string.length; i++) {
		sum += string.charCodeAt(i) * string.charCodeAt(i);	
	}
	return sum;
}

function codeSquareSum(string, pattern, numOfEntries = amountOfEntries)
{
	var borderCaseRes = sr.borderCaseProcess(string, pattern);
	if (typeof(borderCaseRes) !== 'undefined')
		return borderCaseRes;

	var internalVar = new sr.Variables(string, pattern, numOfEntries, getSquareSum);


	for(var i=internalVar.patSize; i<=internalVar.strSize && internalVar.numOfEntries > 0; i++){
		internalVar = sr.updateVarState(internalVar, string, pattern, i);
		internalVar.strSum -= internalVar.leftCode*internalVar.leftCode;
		internalVar.strSum += string.charCodeAt(i)*string.charCodeAt(i);
		internalVar.leftCode = string.charCodeAt(internalVar.startID++);
	}
	return new sr.searchResult(internalVar.subStrID.length === 0 ? [-1] : internalVar.subStrID, internalVar.collisions);
}

module.exports.codeSquareSum = codeSquareSum;
