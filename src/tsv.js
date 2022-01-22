
const fs = require('fs')

const workspace = 'workspace'
const name = process.argv[2]
const year = parseInt(process.argv[3])

const lines = [fs.readFileSync(`./${workspace}/${name}-preprocessed-${year}.txt`).toString().split('\n'), fs.readFileSync(`./${workspace}/${name}-preprocessed-translated-${year}.txt`).toString().split('\n')]
const result = lines[0].map((line, i) => lines[1][i] + '\t' + line)
fs.writeFileSync(`./${workspace}/${name}-${year}.tsv`, result.join('\n'))
