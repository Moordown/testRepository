const h = require('./heuristics');


function boyerMoor(string, pattern, numOfEntities = Infinity) {
	var stopSymbolsTable = h.stopSymbols(pattern)();
	var suffixTable = h.goodSuffix(pattern)();
	if (pattern.length === 0)
		return string.split('').map((elem, i) => i).slice(0, numOfEntities);

	var indexes = [];
	var patLen = pattern.length;
	var patShift = 0;
	var i = 0;
	while(i<=string.length - patLen && numOfEntities > 0){
		var bias = patLen - patShift - 1;
		if(string[i + bias] === pattern[bias]){
			if(patShift !== patLen - 1){
				patShift++;
				continue;
			}
			indexes.push(i);
			numOfEntities--;
		}
		var shift = Math.min(Math.max(suffixTable[string[i+bias]] || 0, stopSymbolsTable[string[i+bias]] || 0), patLen);
		patShift = patLen - shift - (patShift);
		
		patShift = patShift > 0 ? patShift : 1;
		i += patShift;
		patShift = 0;
	}
	return indexes;
}


module.exports.boyerMoor = boyerMoor;