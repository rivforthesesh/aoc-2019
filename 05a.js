// which day is running
console.log('running day 5 part a...');
// import stuff
const fs = require('fs');

// non negative residue of n mod m
function get_residue(n, m) {
    return ((n % m) + m) % m;
}

// grabs the value based on location and parameter mode
function get_value(loc, mode, intcode) {
    if (mode == 0) {
        // position mode
        return intcode[loc];
    } else if (mode == 1) {
        // immediate mode
        return loc;
    }
}

// runs intcode with input n
function runIntCode(n) {
    // reads the file, recording the data as a string
    var input = fs.readFileSync('5.txt').toString();

    // turns the string into an array of ints.. i miss list comprehension
    var intcode = [];
    var i = 0;
    for (i = 0; i < input.split(',').length; i++) {
        intcode.push(parseInt(input.split(',')[i]))
    }

    // get location of current instruction
    // overwrites the i used above, but that isn't used anymore so it's ok
    var i = 0;

    // f(x) = intcode[x]
    // note that a can be intcode[i+1] (mode 0) or i+1 (mode 1)
    while (i < intcode.length) {
        // get op_code and parameter mode
        // symmetric modulo to mathematical modulo (non-negative residue):
        // https://stackoverflow.com/a/47354356
        let op_code = get_residue(intcode[i], 100);
        let mode_a = get_residue(intcode[i] - op_code, 1000)/100; // hundreds digit
        let mode_b = get_residue(intcode[i] - 100*mode_a - op_code, 10000)/1000; // thousands digit
        let mode_c = get_residue(intcode[i] - 1000*mode_b - 100*mode_a - op_code, 100000)/10000; // ten-thousands digit

        // console.log('running instruction: ' + intcode[i])
        // console.log('modes: ' + op_code + ' ' + mode_a + ' ' + mode_b + ' ' + mode_c)

        // transform according to opcode
        if (op_code == 1) {
            // 1,a,b,c => f(c) = f(a) + f(b)
            let a = get_value(i + 1, mode_a, intcode);
            let b = get_value(i + 2, mode_b, intcode);
            let c = get_value(i + 3, mode_c, intcode);
            intcode[c] = intcode[a] + intcode[b];
            i += 4;
        } else if (op_code == 2) {
            // 2,a,b,c => f(c) = f(a) * f(b)
            let a = get_value(i + 1, mode_a, intcode);
            let b = get_value(i + 2, mode_b, intcode);
            let c = get_value(i + 3, mode_c, intcode);
            intcode[c] = intcode[a] * intcode[b];
            i += 4;
            //console.log('set position ' + c + ' to ' + intcode[a] + ' * ' + intcode[b]);
        } else if (op_code == 3) {
            // 3,a => f(a) = n
            let a = get_value(i + 1, mode_a, intcode);
            intcode[a] = n;
            i += 2;
        } else if (op_code == 4) {
            // 4,a => print f(a)
            let a = get_value(i + 1, mode_a, intcode);
            console.log(intcode[a])
            i += 2;
        } else if (op_code == 99) {
            // 99 => halt program
            console.log('program halted')
            break;
        } else {
            // any other => invalid, kill program
            console.log('invalid op code ' + op_code)
            break;
        }
        // next op within each thing
    }
    // return diagnostic code
    return intcode[0];
}

// run with input 1
runIntCode(1);
// console.log('answer = ' + ans)
// > 2467