
const fs = require('fs')

const year = parseInt(process.argv[2])

const similarity = (a, b) => a.split('').map((c, i) => c != b.charAt(i) ? 1 : 0).reduce((a, c) => a + c) / a.length

const lines = fs.readFileSync(`jungang-${year}.tsv`).toString().split('\n').map((line) => line.split('\t'))
const filtered = lines
        .filter(([hangul, hanja]) => similarity(hangul, hanja) >= 0.5)
        .map((line) => line.join('\t'))
const long = filtered.filter((line) => line.length / 2 >= 100)
const short = filtered.filter((line) => line.length / 2 < 100)
fs.writeFileSync(`jungang-${year}-filtered-long.tsv`, long.join('\n'))
fs.writeFileSync(`jungang-${year}-filtered-short.tsv`, short.join('\n'))
