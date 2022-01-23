
const fs = require('fs')
const readline = require('readline')

const inFile = process.argv[2]
const outFile = process.argv[3]

const rl = readline.createInterface(fs.createReadStream(inFile))
const charset = new Set()
rl.on('line', (line) => {
    line.split('').forEach((c) => charset.add(c))
})
rl.on('close', () => {
    fs.writeFileSync(outFile, [...charset].sort().join(''))
})
