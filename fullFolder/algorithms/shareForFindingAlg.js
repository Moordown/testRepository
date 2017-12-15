const br = require('./bruteForce');

function searchResult(indexes, collisions) {
		this.subStrID = indexes;
		this.collisions = collisions;
}

function borderCaseProcess(string, pattern) {
	if (pattern.length === 0)
		return new searchResult(string.split("").map((item, id) => id), 0); 
	if (pattern.length > string.length)
		return new searchResult([-1], 0);
}

function updateVarState(internalVar, string, pattern, i) {
	if (internalVar.patSum === internalVar.strSum) {
		internalVar.collisions++;

		let res = +br.bruteForce(string.slice(i-internalVar.patSize, i), pattern).subStrID[0];
		if (res === 0) {
			internalVar.subStrID.push(i-internalVar.patSize);
			internalVar.numOfEntries--;
			internalVar.collisions--;
		}
	}	
	return internalVar;
}

function Variables(string, pattern, numOfEntries, compareWay, ...compareArg) {
	this.string = string;
	this.pattern = pattern;

	this.patSize = pattern.length;
	this.strSize = string.length;
	
	this.patSum = compareWay(pattern, compareArg);
	this.strSum = compareWay(string.slice(0, this.patSize), compareArg);

	this.numOfEntries = numOfEntries;
	this.startID = 0;
	this.leftCode = string.charCodeAt(this.startID++);

	this.collisions = 0;
	this.subStrID = [];

	this.updateInternalState = function(i) {
		if (this.patSum === this.strSum) {
			this.collisions++;

			//let res = +br.bruteForce(string.slice(i-this.patSize, i), this.pattern).subStrID[0];
			var j=i-this.patSize; 
			while(j < i){
				if (string[j] !== pattern[i-j])
					break;
				j++;
			}

			if (j === i) {
				this.subStrID.push(i-this.patSize);
				this.numOfEntries--;
				this.collisions--;
			}
		}
	}
};


module.exports.searchResult = searchResult;
module.exports.borderCaseProcess = borderCaseProcess;
module.exports.Variables = Variables;
module.exports.updateVarState = updateVarState;