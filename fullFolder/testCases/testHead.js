const fs = require('fs');
const ft = require('../freqTableGenerating/getFreqWordTable');

const startFrTable = JSON.parse(fs.readFileSync('../freqTableGenerating/outFileName.txt', 'utf-8'));

function TestData(moreFreq = null, lessFreq)
{
	this.moreFreq = moreFreq;
	this.lessFreq = lessFreq;
}
function lastMostFreq(freqTable, sortedFrTable, amount)
{
	return ft.ftExtractFrom(freqTable, sortedFrTable, sortedFrTable.length-1, -1, amount);
}
function firstMostFreq(freqTable, sortedFrTable, amount)
{
	return ft.ftExtractFrom(freqTable, sortedFrTable, 0, 1, amount);
}
function getWordList(freqTable, standardWordLen = 5, startFreq = 100, endFreq = 600, neighboor = 25, amount = 10)
{
	var ans = {
		'name': "word\'s length " + standardWordLen,
		'frequenceVariaty': {}
	};
	for(var i = startFreq; i <= endFreq; i += neighboor*2)
	{
		var curFreqTableState = ft.ftSift(freqTable, 
			function(word, freq) {
				return (Math.abs(freq - i) < neighboor && word.length == standardWordLen);
			}
		);
		var sortedCurFreqTableState = ft.ftSort(curFreqTableState);

		var examples = firstMostFreq(curFreqTableState, sortedCurFreqTableState, amount);
		var lastExamples = lastMostFreq(curFreqTableState, sortedCurFreqTableState, amount);

		//console.log(firstExamples, ans);
		ans['frequenceVariaty'][""+i] = examples;
	}
	return ans;
}

function StandardKeys()
{
	this.startLen = 2;
	this.finishLen = 8;
	this.startFreq = 100;
	this.finishFreq = 1000;
	this.amount = 6;
	this.neighboorSize = 25;
}

function helpMessageCase(key)
{
	if (key === '-h' || key === '--help')
	{
		var ans = "Format: <script> <outFileName> [-h|--help].\n" +
				  "This script get frequence table from \"../outFileName.txt\". " +
				  "Then it classifies entries of words and printed they to the \"./freqData.txt\".";
		console.log(ans);
		return true;
	}
	return false;
}

function main()
{
	var key = process.argv[2];
	if (helpMessageCase(key))
		process.exit(0);

	var freqTable = new ft.FreqTable();
	ft.ftCopy(freqTable, startFrTable);
	var fullInformation = {};
	var keys = new StandardKeys();
	for(var i = keys.startLen; i <= keys.finishLen; i++)
	{
		var curTestCase = getWordList(freqTable, i, keys.startFreq, keys.finishFreq, keys.neighboorSize, keys.amount);
		fullInformation[curTestCase.name] = curTestCase.frequenceVariaty;
	}
	var strFormFullInf = JSON.stringify(fullInformation, "", 6);

	try {
		var outFileName = key;
		fs.writeFileSync(outFileName, strFormFullInf, 'utf-8');
	} catch(exp)
	{
		console.error("error: " + exp.message);
	}
}

main();