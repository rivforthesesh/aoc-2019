//node = "D:\Program Files\nodejs\node.exe"

// which day is running
console.log('running day 1 part a...');
// import stuff
const fs = require('fs');

// this does not work bc asynchronicity
//fs.readFile('1.txt', (err, data) => {if (err) throw err; var input1a = data.toString();})

// reads the file, recording the data as a string
var input1a = fs.readFileSync('1.txt').toString();

// turns the string into an array
var masses = input1a.split('\r\n');

// iterates over array to get the sum
var fuel_reqs = 0;
var i;
for (i = 0; i < masses.length; i++) {
    // fuel required: floor(mass/3) - 2
    fuel_reqs += Math.floor(masses[i]/3) - 2;
}

console.log('fuel needed = ' + fuel_reqs)