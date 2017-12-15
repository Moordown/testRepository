const nv = require('./niceView');

function createAutomaton(str)
{
    var alphabet = [],
        automaton = [];
    for(var i=0; i<str.length; i++)
    {
        alphabet[str.charAt(i)] = 1;
        automaton[i] = [];
    }
    automaton[str.length] = [];
 
    for(var letter in alphabet)
        automaton[0][letter] = 0;
 
    for(var state=0; state<str.length; state++)
    {
        var prev = automaton[state][str.charAt(state)];
        automaton[state][str.charAt(state)] = state + 1;
        for(var letter in alphabet)
            automaton[state + 1][letter] = automaton[prev][letter];
    }
    return automaton;
}
 

function printAutomaton(automaton)
{
    var fieldSize = 4;

    var title = [];
    for(var letter in automaton[0])
        title.push(letter);
    console.log("  " + nv.getPrettyLine(fieldSize, title));

    for(var i=0; i<automaton.length; i++)
            console.log(nv.getPrettyLine(2, `${i}`) + 
                nv.getPrettyLine(fieldSize, automaton[i]) + "\r");

}
 
function main(str)
{
    var auto = createAutomaton(str);
    printAutomaton(auto);
}

if (require.main === module)
    main(process.argv[2] || "ananas");

module.exports.createAutomaton = createAutomaton;
module.exports.printAutomaton = printAutomaton;
