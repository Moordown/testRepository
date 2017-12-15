const bm = require('./algorithms/boyerMoor');
const amt = require('./algorithms/getAutomaton');
const gen = require('./algorithms/getEntities');
const br = require('./algorithms/bruteForce');
const rk = require('./algorithms/rabinKarp');
const cs = require('./algorithms/codeSum');
const css = require('./algorithms/codeSquareSum');
const fileGeneric = require('./algorithms/generateStrFile');
const fs = require('fs');

const textFileName = "hugeText.txt";
const dataFileName = "data.txt"; 
const plotDataFileName = "plotData.txt";

function Algorithms() {	
	this.boyerMoor = function boyerMoor(s, p) {
		return bm.boyerMoor(s, p);
	};
	this.codeSum = function codeSum(s, p){
		var {subStrID: indexes} = cs.codeSum(s, p);
		return indexes;
	};this.boyerMoor = function boyerMoor(s, p) {
		return bm.boyerMoor(s, p);
	};
	this.dka = function dka(s, p) {
		var automaton = amt.createAutomaton(p);
		var indexes = gen.getEntities(s, automaton);
		return indexes;
	};
	this.bruteForce = function bruteForce(s, p) {
		var {subStrID: indexes} = br.bruteForce(s, p);
		return indexes;
	};
	this.codeSquareSum = function codeSquareSum(s, p){
		var {subStrID: indexes} = css.codeSquareSum(s, p);
		return indexes;
	};
	this.rabinKarp = function rabinKarp(s, p){
		var {subStrID: indexes} = rk.rabinKarp(s, p);
		return indexes;
	};
}

function Container(name)
{
	this.name = name;
	this.algRes = {};
}

function findBigSubStr(algorithms, text, subStr)
{
	var test = "bigSubStr";
	var curTest = new Container(test);
	for (var alg in algorithms)
	{
		var startTempTime = new Date();
		algorithms[alg](text, subStr);	
		var endTempTime = (new Date()) - startTempTime;
		
		curTest.algRes[alg] = endTempTime;
		console.log(";");		
	}
	console.log(JSON.stringify(curTest, "", 5));
	console.log('\n\n\n');
}

const keyWord = 'borrow';
function decreaseData(algorithms, text, retreatment = 1000000)
{
	var ans = [];
	while(text.length > 60000) 
	{
		var test = "text with " + text.length + " elements";
		var curTest = new Container(test);
		for(alg in algorithms)
		{
			var startTempTime = new Date();
			algorithms[alg](text, keyWord);
			var endTempTime = (new Date()) - startTempTime;
			
			curTest.algRes[alg] = endTempTime;
		}
		var tempRes = JSON.stringify(curTest, "", 5);
		console.log(tempRes);
		ans.push(tempRes);
		text = text.slice(0, text.length/2);
	}
	return ans;
} 

function main()
{
	var key = process.argv[2];
	if (key === '-b')
	{
		process.argv.splice(2, 1);
		var bigSubStrFileName = process.argv[2];
		try {
			var bigSubStr = fs.readFileSync(bigSubStrFileName, 'utf-8');
			var text = fs.readFileSync(textFileName, 'utf-8');
		} catch(exp)
		{
			console.error(exp.message);
			process.exit(1);
		}
		findBigSubStr(new Algorithms(), text, bigSubStr);
		process.exit(0);
	} else if (key === '-d')
	{
		try {
			var text = fs.readFileSync(textFileName, 'utf-8');
		} catch(exp)
		{
			console.error(exp.message);
			process.exit(1);
		}
		var ans = decreaseData(new Algorithms(), text);
		try {
			fs.writeFileSync("decreasedByTermTwoData.txt", JSON.stringify(ans, "", 4), 'utf-8');
		} catch (exp)
		{
			console.error(exp.message);
			process.exit(1);
		}
		process.exit(0);
	}
	try {
		var rawFreqData = fs.readFileSync(dataFileName, 'utf-8');
		var text = fs.readFileSync(textFileName, 'utf-8');
		var freqData = JSON.parse(rawFreqData);
	} catch(exp)
	{
		console.error("error: " + exp.message);
		process.exit(1);
	}
	var algorithms = new Algorithms();
	var test = "word\'s length 7";
	var curTest = new Container(test);
	for (var alg in algorithms)
	{
		curTest.algRes[alg] = {};

		for (var freq in freqData[test])
		{
			var startTempTime = new Date();
			var amount = 1;
			for (var word of freqData[test][freq]['words'])
			{
				algorithms[alg](text, word);
				amount++;
			}
			var endTempTime = (new Date()) - startTempTime;
			curTest.algRes[alg][freq] = endTempTime / amount;
			console.log(freq);
		}
	}
	console.log(JSON.stringify(curTest, "", 5));
	console.log('\n\n\n');
}

if(require.main === module)
	main();
