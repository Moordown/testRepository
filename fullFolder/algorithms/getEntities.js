function getEntities(string, automatoon, num = Infinity)
{
	var terminalState = automatoon.length - 1;
	var subStrSize = automatoon.length - 2;
	var currentState = 0;
	var ans = [];

	var positionShift = 0;
	var alphaBet = [];
	for(var letter in automatoon[0])
		alphaBet[letter] = 0;
	for(var i=0; i<string.length && num > 0; i++, positionShift++)
	{
		var letter = string[i];
		if (letter in alphaBet) 
		{
			currentState = automatoon[currentState][letter];
			if (currentState === terminalState)
			{
				ans.push(positionShift - subStrSize);
				num--;
			}
		} else
			currentState = 0;
	}
	return ans;
}

module.exports.getEntities = getEntities;
