
const fs = require('fs')

const lines = fs.readFileSync(process.argv[2]).toString().split('\n')
    .map((line) => line.split('\t')).filter((entry) => entry.length == 2)

const output = []
lines.forEach(([hangul, hanja]) => {
    if(output.length > 0 && output[output.length - 1][0].length + 1 + hangul.length < 1000) {
        output[output.length - 1][0] += ' ' + hangul
        output[output.length - 1][1] += ' ' + hanja
    } else {
        output.push([hangul, hanja])
    }
})

fs.writeFileSync(process.argv[3], output.map((entry) => entry.join('\t')).join('\n'))
