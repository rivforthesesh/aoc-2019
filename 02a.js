// which day is running
console.log('running day 2 part a...');
// import stuff
const fs = require('fs');

// reads the file, recording the data as a string
var input2a = fs.readFileSync('2.txt').toString();

// turns the string into an array of ints.. i miss list comprehension
var intcode = [];
var i = 0;
for (i = 0; i < input2a.split(',').length; i++) {
    intcode.push(parseInt(input2a.split(',')[i]))
}

// correct code
intcode[1] = 12;
intcode[2] = 2;

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
        console.log('program exited normally')
        break;
    } else {
        console.log('invalid op code ' + op_code)
        break;
    }

    // next op
    i += 4
}

console.log('value at position 0 = ' + intcode[0])