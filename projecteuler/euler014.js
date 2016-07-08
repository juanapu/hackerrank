'use strict';

// https://www.hackerrank.com/contests/projecteuler/challenges/euler014

// FIXME: this code gives "wrong answer" for test case #4 and above

const start = new Date();
const max = 5 * Math.pow(10, 6);
let collatz = {1: 1};
for (let i = 2; i <= max; i++)
    collatz[i] = null;

function main() {
    for (let i = 2; i <= max; i++) {
        let chain = [], j = 0;
        for (var steps = 1, n = i; n > 1; steps++) {
            chain[j++] = n;
            if (collatz[n] !== null) {
                steps += collatz[n] - 1;
                break;
            } else {
                if (n % 2 === 0) n /= 2;
                else n = 3 * n + 1;
            }
        }
        for (j = 0; j < chain.length; j++) {
            if (chain[j] <= max && collatz[chain[j]] === null) {
                collatz[chain[j]] = steps - j;
            }
        }
    }
    input.split('\n').slice(1).map(Number).forEach(processLine);
}

function processLine(lineN) {
    for (var maxN, maxStep = -Infinity; lineN > 0; lineN--) {
        if (collatz[lineN] > maxStep) {
            maxStep = collatz[lineN];
            maxN = lineN;
        }
    }
    process.stdout.write(maxN + '\n');
}

process.stdin.resume();
process.stdin.setEncoding('ascii');

let input = "";
process.stdin.on('data', function (data) {
    input += data;
});

process.stdin.on('end', main);

if (process.argv[2] === 'test') {
    process.stdin.pause();
    input = `
    5
    10 
    15
    20
    1
    ${max}
    `.replace(/^\s+/mg, "").trim();
    process.stdout.write(`Input:\n${input}\n\nOutput:\n`);
    main();
    const end = new Date();
    process.stdout.write((end - start) / 1000 + ' seconds\n');
}
