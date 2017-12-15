const fs = require('fs');

function stopSymbols(pattern) {
	var chart = [];
	
	function getChart() {
		pattern += "";
		for(var i=pattern.length-2; i>=0; i--)
			if(!(pattern[i] in chart))
				chart[pattern[i]] = i+1;
		return chart;
	}

	getChart.getIndexesOnString = function(string, numOfEntities) {
		if (pattern.length === 0)
			return string.split('').map((elem, i) => i).slice(0, numOfEntities);
		if (arguments.length === 1)
			numOfEntities = Infinity;
		var indexes = [];
		var patLen = pattern.length;
		var patShift = 0;
		for(var i=0; i<=string.length - patLen && numOfEntities > 0;){
			var bias = patLen - patShift - 1;
			if(string[i + bias] ===
				pattern[bias]){
				if(patShift !== patLen - 1){
					patShift++;
					continue;
				}
				indexes.push(i);
				numOfEntities--;
			}
			var shift = Number.isNaN(chart[string[i + bias]])
						? 0 : chart[string[i + bias]];
			patShift = patLen - shift - (patShift);
			patShift = patShift > 0 ? patShift : 1;
			i += patShift;
			patShift = 0;
		}
		return indexes;
	}

	return getChart;
}

function goodSuffix(pattern) {

	var suffixShift = [];

	function prefixFunction(string) {
		var m = string.length;
		var p = new Array(m).fill(0);
		var k = p[0]
		for(var i=1; i<m; i++) {
			k = p[i-1];
			while (k > 0 && string[i] !== string[k])
				k = p[k -1];
			if (string[i] === string[k])
				k++;
			p[i] = k;
		}
		return p;
	}

	function getSuffixTable() {
		var m = pattern.length;
		var pi = prefixFunction(pattern);
		var pi1 = prefixFunction(pattern.split('').reverse());
		suffixShift = new Array(m);
		for(var j=0; j<m; j++)
			suffixShift[j] = (m - pi[m-1]);
		for(var i=1; i<m; i++) {
			var j = m - pi1[i-1];
			var secondVal = pattern[i-1] !== pattern[2*i - pi1[i-1]] ? m : i - pi1[i-1];
			suffixShift[j] = Math.max( suffixShift[j], secondVal);
		}
		suffixShift = suffixShift.reverse();
		var i=1;
		suffixShift[0] = 1;
		while(pi1[i-1] + 1 === pi1[i])
			suffixShift[0] = ++i;
		return suffixShift;
	}

	getSuffixTable.getIndexesOnString = function (string, numOfEntities) {
		if (pattern.length === 0)
			return string.split('').map((elem, i) => i).slice(0, numOfEntities);
		if (arguments.length === 1)
			numOfEntities = Infinity;
		var indexes = [];
		var patLen = pattern.length;
		var patShift = 0;
		for(var i=0; i<=string.length - patLen && numOfEntities > 0;){
			var bias = patLen - patShift - 1;
			if(string[i + bias] ===
				pattern[bias]){
				if(patShift !== patLen - 1){
					patShift++;
					continue;
				}
				indexes.push(i);
				numOfEntities--;
			}
			var shift = Number.isNaN(suffixShift[string[i + bias]])
						? 0 : suffixShift[string[i + bias]];
			patShift = patLen - shift - (patShift);
			patShift = patShift > 0 ? patShift : 1;
			i += patShift;
			patShift = 0;
		}
		return indexes;
	}

	return getSuffixTable;
}

if (require.main === module)
{
	//var t = fs.readFileSync("warAndPeace.txt", "ASCII");
	var p = fs.readFileSync("subStrFile.txt", "ASCII");

	console.log(goodSuffix(p)());
	console.log(stopSymbols(p)());
}

module.exports.stopSymbols = stopSymbols;
module.exports.goodSuffix = goodSuffix;