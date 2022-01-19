
const fs = require('fs')

const year = parseInt(process.argv[2])

const similarity = (a, b) => a.split('').map((c, i) => c != b.charAt(i) ? 1 : 0).reduce((a, c) => a + c) / a.length

const lines = fs.readFileSync(`jungang-${year}.tsv`).toString().split('\n').map((line) => line.split('\t'))
const filtered = lines
        .filter(([hangul, hanja]) => similarity(hangul, hanja) >= 0.5)
        .map((line) => line.join('\t'))
const long = filtered.filter((line) => line.length / 2 >= 300)
const medium = filtered.filter((line) => line.length / 2 >= 100 && line.length / 2 < 300)
const short = filtered.filter((line) => line.length / 2 < 100)
fs.writeFileSync(`jungang-${year}-filtered-long.tsv`, long.join('\n'))
fs.writeFileSync(`jungang-${year}-filtered-medium.tsv`, medium.join('\n'))
fs.writeFileSync(`jungang-${year}-filtered-short.tsv`, short.join('\n'))

const hanja = filtered
        .map((line) => line.split('\t')[1])
        .map((line) => line.replace(/○/g, '〇'))
        .flatMap((line) => line.replace(/[■-◿]/g, '\n').split('\n'))
        .filter((line) => line.trim())

fs.writeFileSync(`filtered-${year}.txt`, hanja.join('\n'))
