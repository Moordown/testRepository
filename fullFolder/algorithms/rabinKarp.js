'use strict';
const sr = require('./shareForFindingAlg');
const cs = require('./codeSum');

require('./shareForStringObject');

const base = 100;
const amountOfEntries = Infinity;
const posMult = 2;

function pow2(deg)
{
	return 2 << (deg-1);
}

function getPositionSum(string, posMult) {

	var sum = 0;
	for(var i=0; i<string.length; i++) {
		sum += (string.charCodeAt(i) * (1 << i));	
	}
	return sum;
}

function rabinKarp(string, pattern, numOfEntries = amountOfEntries)
{
	var borderCaseRes = sr.borderCaseProcess(string, pattern);
	if (typeof(borderCaseRes) !== 'undefined')
		return borderCaseRes;

	var internalVar = new sr.Variables(string, pattern, numOfEntries, getPositionSum, posMult);
	internalVar.strLineSum = cs.getSum(string.slice(0, internalVar.patSize));

	for(var i=internalVar.patSize; i<=internalVar.strSize && internalVar.numOfEntries > 0; i++){
		internalVar = sr.updateVarState(internalVar, string, pattern, i);
		internalVar.strSum = (internalVar.strSum - internalVar.leftCode) / posMult + 
					string.charCodeAt(i)*(1 << internalVar.patSize - 1);
		internalVar.leftCode = string.charCodeAt(internalVar.startID++);
		//console.log(internalVar.strSum);

	}
	return new sr.searchResult(internalVar.subStrID.length === 0
	 ? [-1] : internalVar.subStrID, internalVar.collisions);
}

module.exports.rabinKarp = rabinKarp;
