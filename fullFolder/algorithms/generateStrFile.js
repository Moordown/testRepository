const fs = require('fs');
const measure = 1/52;

function getEngSymbol(value)
{
	var symbolId = Math.ceil(value / measure);
	if (symbolId === 52)
		symbolId = 32;
	else if (symbolId > 25)
		symbolId = 39 + symbolId;
	else 
		symbolId = 97 + symbolId; 
	return String.fromCharCode(symbolId);
}


function main() {
	var file = process.argv[2];
	if ( file === undefined ) {
		console.error("Don\'t pass a file name as argument for script");
		process.exit(1);
	}

	try {
		fs.accessSync(file, fs.constants.R_OK);
	} catch(exp) {
		console.error(exp.message);
	}

	var strBuf = "";
	var amountRows = 10000;
	for(var i=0; i<amountRows; i++) {
		var lineSize = Math.random()*1000;
		for(var j=0; j<lineSize; j++) {
			var symbol = getEngSymbol(Math.random());
			strBuf += symbol;
		}
		strBuf += '\n';
	}
	fs.writeFileSync(file, strBuf);
}

if (require.module === main)
	main();
module.exports.getEngSymbol = getEngSymbol;
