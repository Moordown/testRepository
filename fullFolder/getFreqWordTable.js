const fs = require('fs');
var mode = process.argv[2];
const separators = new Set([
	' ', '.', ',', '!', '?',':',
	';', '-', '–', '\'', '\"', '\r', '\n', '\`', '\'',
	'(', ')', '[', ']', '{', '}', '*', '#', '&', '‘',
	'—', '“', '”'
]);
function FreqTable()
{
}

function ftSort(curFrTable)
{
	sortedForm = [];
	for(var word in curFrTable)
		sortedForm.push(word);
	sortedForm.sort((a, b) => curFrTable[b] - curFrTable[a]);
	return sortedForm;
}
function ftExtractFrom(curFrTable, sortedForm, position = 0, step = 1, amount = 10)
{
	// curFtTable have to match for sortedForm, as they linked to the same object with accuracy to permutation.
	var freq = [];
	var words = [];
	for(var i=position; i<sortedForm.length && i>=0 && amount > 0; i += step)
	{
		freq.push(curFrTable[sortedForm[i]]);
		words.push(sortedForm[i]);
		amount--;
		process.stdout.write(" " + i);
	}
	return {
		'words': words,
		'freq': freq
	};
}
function ftCopy(curFrTable, freqTable)
{
	for(var word in freqTable)
		curFrTable[word] = freqTable[word];
}
function ftSift(curFrTable ,callBack)
{
	var sifted = new FreqTable();
	for (var word in curFrTable )
	{
		if (typeof curFrTable[word] !== 'function' &&  callBack(word, curFrTable[word]))
			sifted[word]=curFrTable[word];
	}
	return sifted;
}
function ftAllToLowerCase(curFrTable) 
{
	for (var word in curFrTable)
	{
		if (word !== word.toLowerCase() && typeof(curFrTable[word]) !== 'function')
		{
			curFrTable[word.toLowerCase()] = curFrTable[word.toLowerCase()] || 0;
			curFrTable[word.toLowerCase()] += curFrTable[word];
			delete curFrTable[word];
		}
	}
}

function helpMessageCase(mode)	
{
	if (mode === '-h' || mode === '--help')
	{
		console.log(
			`Format: <scriptName> [-h] <inpFileName> <outFileName>. ` +
			'curFrTable script process text from "inpFileName" word by word and print word frequence table ' +
			'to the "outFileName" as JSON object.'
		);
		return true;
	}
	return false;
}
function extractFrequenceTable(text)
{
	var wordEntities = new FreqTable();
	var prevIndex = 0;
	var strBuf = "";
	text += " ";
	for(var i=0; i<text.length; i++)
	{
		if(separators.has(text[i]))
		{
			if (strBuf.length != 0)
			{
				var candidate = strBuf;
				if (!(candidate in wordEntities))
					wordEntities[candidate]=0;
				wordEntities[candidate]++;
				strBuf = "";
			}
			prevIndex = i+1;
		} 
		else
		{
			strBuf += text[i];
		}
	}
	ftAllToLowerCase(wordEntities);
	return wordEntities;
} 

function main()
{
	if (helpMessageCase(mode))
		process.exit(0);
	var inpFileName = mode;
	var outFileName = process.argv[4] || "outFileName.txt";
	try
	{
		var text = fs.readFileSync(inpFileName, 'utf-8');
		var freqTable = extractFrequenceTable(text);
		var res = ftSift(freqTable, 
			function(word, freq) {
				return (freq > 100 && word.length > 7);
		}
		);
		//console.log(res);
		var frTableForOut = JSON.stringify(freqTable, "", 2);
		fs.writeFileSync(outFileName, frTableForOut, 'utf-8');
	} catch(exp)
	{
		console.error(exp);
		process.exit(1);
	}

}

if (require.main === module)
	main();

module.exports.FreqTable = FreqTable;
module.exports.ftSort = ftSort;
module.exports.ftExtractFrom = ftExtractFrom;
module.exports.ftSift = ftSift;
module.exports.ftCopy = ftCopy;
module.exports.ftAllToLowerCase = ftAllToLowerCase;
