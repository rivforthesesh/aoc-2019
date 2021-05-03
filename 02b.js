// which day is running
console.log('running day 2 part b...');
// import stuff
const fs = require('fs');

// does 02a for a given pair of initial mem 1 and mem 2
function runIntCode(noun, verb) {
    // reads the file, recording the data as a string
    var input2b = fs.readFileSync('2.txt').toString();

    // turns the string into an array of ints.. i miss list comprehension
    var intcode = [];
    var i = 0;
    for (i = 0; i < input2a.split(',').length; i++) {
        intcode.push(parseInt(input2b.split(',')[i]))
    }

    // correct code
    intcode[1] = noun;
    intcode[2] = verb;

    // get location of current instruction
    // overwrites the i used above, but that isn't used anymore so it's ok
    var i = 0;

    // run the intcode according to these rules:
    // f(x) = intcode[x]
    // 1,a,b,c => f(c) = f(a) + f(b)
    // 2,a,b,c => f(c) = f(a) * f(b)
    // 99,a,b,c => halt program
    // any other => invalid, kill program
    while (i < intcode.length) {
        // get op_code and inputs
        let op_code = intcode[i];
        let a = intcode[i + 1];
        let b = intcode[i + 2];
        let c = intcode[i + 3];
        //console.log(op_code + ' ' + a + ' ' + b + ' ' + c)

        // transform according to opcode
        if (op_code == 1) {
            intcode[c] = intcode[a] + intcode[b];
            //console.log('set position ' + c + ' to ' + intcode[a] + ' + ' + intcode[b]);
        } else if (op_code == 2) {
            intcode[c] = intcode[a] * intcode[b];
            //console.log('set position ' + c + ' to ' + intcode[a] + ' * ' + intcode[b]);
        } else if (op_code == 99) {
            // console.log('program exited normally')
            break;
        } else {
            // console.log('invalid op code ' + op_code)
            break;
        }

        // next op
        i += 4
    }
    // return value at address 0
    return intcode[0];
}

// now we want to get initial values that give the output 19690720
var ans = 0;
var noun = 0;
var verb = 0;
var nv = 0; // noun plus verb; we increment this in the outer loop

// loops until break, breaks iff ans == 19690720
outerLoop: // label to break out of outer loop
while (true) {
    // reset noun
    noun = 0;
    for (noun = 0; noun <= nv; noun++) {
        // reset verb such that noun + verb = nv
        verb = nv - noun;
        // console.log("noun = " + noun + "; verb = " + verb);
        // get result of intcode
        ans = runIntCode(noun, verb);
        // break if this is what we want
        if (ans == 19690720) {
            break outerLoop;
        }
    }
    // increment
    nv += 1;
}
console.log('answer = ' + ((100 * noun) + verb))