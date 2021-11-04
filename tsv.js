
const fs = require('fs')
const path = require('path')

const lines = [fs.readFileSync('preprocessed.txt').toString().split('\n'), fs.readFileSync('preprocessed-translated.txt').toString().split('\n')]
const result = lines[0].map((line, i) => lines[1][i] + '\t' + line)
fs.writeFileSync('merged.tsv', result.join('\n'))
