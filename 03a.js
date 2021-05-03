// assumptions made: dist > 0

// which day is running
console.log('running day 3 part a...');
// import stuff
const fs = require('fs');

// reads the file, recording the data as a string
var input = fs.readFileSync('3.txt').toString();

// set up wires u and v
var u_input = input.split('\r\n')[0].split(',')
var v_input = input.split('\r\n')[1].split(',')

// set up list of coords - we start from (0,0) for each
var pos // current point (x,y)
var dir // direction to head in
var dist // distance to go
var dx // change in x
var dy // change in y

// draw u wire
pos = [0,0];
var u = [pos];
var i = 0;
for (i = 0; i < u_input.length; i++) {
    dir = u_input[i][0]
    dist = parseInt(u_input[i].slice(1))
    // update position
    if (dir == 'R') {
        for (dx = 1; dx <= dist; dx++) {
            u.push([pos[0] + dx, pos[1]]);
        }
    } else if (dir == 'L') {
        for (dx = 1; dx <= dist; dx++) {
            u.push([pos[0] - dx, pos[1]]);
        }
    } else if (dir == 'U') {
        for (dy = 1; dy <= dist; dy++) {
            u.push([pos[0], pos[1] + dy]);
        }
    } else if (dir == 'D') {
        for (dy = 1; dy <= dist; dy++) {
            u.push([pos[0], pos[1] - dy]);
        }
    } else {
        console.log('something went wrong - we have dir = ' + dir);
        break;
    }
    // set up next position
    pos = u[u.length - 1];
}

// find intersection points
pos = [0,0];
var int_list = [];
var next_pos;

// if you need this code again, make it a function instead of copying and pasting a block

// follow v wire, save to int_list if they come up and are new
var j = 0;
var k = 0;
for (i = 0; i < v_input.length; i++) {
    dir = v_input[i][0]
    dist = parseInt(v_input[i].slice(1))
    // update position
    if (dir == 'R') {
        for (dx = 1; dx <= dist; dx++) {
            next_pos = [pos[0] + dx, pos[1]];

            j_loop: // check if next_pos is in u
            for (j = 0; j < u.length; j++) {
                if (next_pos[0] == u[j][0] && next_pos[1] == u[j][1]) {
                    // intersection between u and v
                    k_loop:
                    for (k = 0; k < int_list.length; k++) {
                        if (next_pos[0] == int_list[k][0] && next_pos[1] == int_list[k][1]) {
                            // already in int_list
                            break j_loop;
                        }
                    }
                    // j_loop hasn't broken => this is the one!
                    int_list.push(next_pos)
                }
            }
        }
    } else if (dir == 'L') {
        for (dx = 1; dx <= dist; dx++) {
            next_pos = [pos[0] - dx, pos[1]];

            j_loop: // check if next_pos is in u
            for (j = 0; j < u.length; j++) {
                if (next_pos[0] == u[j][0] && next_pos[1] == u[j][1]) {
                    // intersection between u and v
                    k_loop:
                    for (k = 0; k < int_list.length; k++) {
                        if (next_pos[0] == int_list[k][0] && next_pos[1] == int_list[k][1]) {
                            // already in int_list
                            break j_loop;
                        }
                    }
                    // j_loop hasn't broken => this is the one!
                    int_list.push(next_pos)
                }
            }
        }
    } else if (dir == 'U') {
        for (dy = 1; dy <= dist; dy++) {
            next_pos = [pos[0], pos[1] + dy];

            j_loop: // check if next_pos is in u
            for (j = 0; j < u.length; j++) {
                if (next_pos[0] == u[j][0] && next_pos[1] == u[j][1]) {
                    // intersection between u and v
                    k_loop:
                    for (k = 0; k < int_list.length; k++) {
                        if (next_pos[0] == int_list[k][0] && next_pos[1] == int_list[k][1]) {
                            // already in int_list
                            break j_loop;
                        }
                    }
                    // j_loop hasn't broken => this is the one!
                    int_list.push(next_pos)
                }
            }
        }
    } else if (dir == 'D') {
        for (dy = 1; dy <= dist; dy++) {
            next_pos = [pos[0], pos[1] - dy];

            j_loop: // check if next_pos is in u
            for (j = 0; j < u.length; j++) {
                if (next_pos[0] == u[j][0] && next_pos[1] == u[j][1]) {
                    // intersection between u and v
                    k_loop:
                    for (k = 0; k < int_list.length; k++) {
                        if (next_pos[0] == int_list[k][0] && next_pos[1] == int_list[k][1]) {
                            // already in int_list
                            break j_loop;
                        }
                    }
                    // j_loop hasn't broken => this is the one!
                    int_list.push(next_pos)
                }
            }
        }
    } else {
        console.log('something went wrong - we have dir = ' + dir);
        break;
    }
    // set up next position
    pos = next_pos;
}

console.log('intersections found = ' + int_list.length)
console.log(int_list)

// we now have an intersection list
var min_dist = 0;
for (k = 0; k < int_list.length; k++) {
    pos = int_list[k];
    dist = Math.abs(pos[0]) + Math.abs(pos[1]);
    // replace min_dist if dist is non zero and (is less than min_dist or min_dist is 0)
    if (dist != 0 && (min_dist == 0 || dist < min_dist)) {
        min_dist = dist
    }
}

console.log('min manhattan distance = ' + min_dist);