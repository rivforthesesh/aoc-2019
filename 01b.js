//node = "D:\Program Files\nodejs\node.exe"

// which day is running
console.log('running day 1 part b...');
// import stuff
const fs = require('fs');

// this does not work bc asynchronicity
//fs.readFile('1.txt', (err, data) => {if (err) throw err; var input1a = data.toString();})

// reads the file, recording the data as a string
var input1b = fs.readFileSync('1.txt').toString();

// turns the string into an array
var masses = input1b.split('\r\n');

// iterates over array to get the sum
var fuel_reqs = 0;
var i;
for (i = 0; i < masses.length; i++) {
    // get overall fuel requirement
    let fuel_req = 0;
    let fuel_current = Math.floor(masses[i]/3) - 2;
    while (fuel_current > 0) {
        fuel_req += fuel_current;
        // get next summand for fuel requirement
        fuel_current = Math.floor(fuel_current/3) - 2;
    }
    // add this to the fuel requirement across all modules
    fuel_reqs += fuel_req;
}

console.log('fuel needed = ' + fuel_reqs)