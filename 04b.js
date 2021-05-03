// which day is running
console.log('running day 4 part a...');

// too lazy to make and read in an input file
input = [264793, 803935]

// check each password
    // rule 1: six digits (already sorted)
    // rule 2: within range given (already sorted)
    // rule 3: two adjacent digits are the same
    // rule 4: digits are non-decreasing

var pw = input[0]; // password as number
var pwd; // list of digits
var d; // one digit
var i; // index of selected digit (0 for most significant)
var num_valid = 0; // number of valid passwords
var rule3 = false; // whether the password satisfies the rule
pw_loop:
for (pw = input[0]; pw <= input[1]; pw++) {
    rule3 = false; // reset rule3
    pwd = pw.toString().split('') // list of digits
    for (i = 0; i < pwd.length - 1; i++) {
        // if decreasing, go to next password
        // if equal, record that it satisfies rule 3
        if (parseInt(pwd[i]) > parseInt(pwd[i+1])) {
            continue pw_loop;
        } else if (parseInt(pwd[i]) == parseInt(pwd[i+1])) {
            // check other surrounding digits
            if (i < 1 || parseInt(pwd[i-1]) != parseInt(pwd[i])) {
                if (i > pwd.length - 2 || parseInt(pwd[i+1]) != parseInt(pwd[i+2])) {
                    rule3 = true;
                }
            }
        }
    }
    // if we get here, it satisfies rule 4
    if (rule3) {
        num_valid += 1;
    }
}

console.log('number of valid passwords: ' + num_valid)