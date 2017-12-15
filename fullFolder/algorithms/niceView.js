function lineGenerate(size, values)
{
	var line = "";
	if (typeof values === 'string')
		values = [values];
	
	for(var i in values)
		line += fitToSize(size, String(values[i]));
	return line;
}

function fitToSize(size, string)
{
	if(string.length >= size)
		return string;
	return " ".repeat(size-string.length) + string;
}

function printArrOfData(size, data)
{
	data.forEach((arrOfValues) => console.log(lineGenerate(size, arrOfValues)));
}

function main()
{
	var val =[
		["1", "2", "3", '4'],
		['5', '6', '7', '8'],
		['9', '10', '11', '12'],
		['13', '14', '15', '16']
		];
	printArrOfData(3, val);
}

if (require.main === module)
	main();

module.exports.getPrettyLine = lineGenerate; 
