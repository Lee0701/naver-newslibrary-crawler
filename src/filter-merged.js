
const fs = require('fs')

const lines = fs.readFileSync(`merged.txt`).toString().split('\n')
const filtered = lines.filter((line) => line.length > 20)

fs.writeFileSync(`merged-filtered.txt`, filtered.join('\n'))
