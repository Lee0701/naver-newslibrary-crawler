
const fs = require('fs')

const year = parseInt(process.argv[2])

const lines = [fs.readFileSync(`preprocessed-${year}.txt`).toString().split('\n'), fs.readFileSync(`preprocessed-translated-${year}.txt`).toString().split('\n')]
const result = lines[0].map((line, i) => lines[1][i] + '\t' + line)
fs.writeFileSync(`jungang-${year}.tsv`, result.join('\n'))
