
const fs = require('fs')

const workspace = 'workspace'
const name = process.argv[2]
const year = parseInt(process.argv[3])

const similarity = (a, b) => a.split('').map((c, i) => c != b.charAt(i) ? 1 : 0).reduce((a, c) => a + c) / a.length

const lines = fs.readFileSync(`./${workspace}/${name}-${year}.tsv`).toString().split('\n').map((line) => line.split('\t'))
const filtered = lines
        .filter(([hangul, hanja]) => similarity(hangul, hanja) >= 0.5)
        .map((line) => line.join('\t'))
const unfiltered = lines
        .map((line) => line.join('\t'))
// const long = filtered.filter((line) => line.length / 2 >= 300)
// const medium = filtered.filter((line) => line.length / 2 >= 100 && line.length / 2 < 300)
// const short = filtered.filter((line) => line.length / 2 < 100)
// fs.writeFileSync(`jungang-${year}-filtered-long.tsv`, long.join('\n'))
// fs.writeFileSync(`jungang-${year}-filtered-medium.tsv`, medium.join('\n'))
// fs.writeFileSync(`jungang-${year}-filtered-short.tsv`, short.join('\n'))

const postprocess = (lines) => lines
        .map((line) => line.split('\t')[1])
        .map((line) => line.replace(/○/g, '〇'))
        .flatMap((line) => line.replace(/[■-◿]/g, '\n').split('\n'))
        .filter((line) => line.trim())

const hanja = postprocess(filtered)
const hanjaUnfiltered = postprocess(unfiltered)

fs.writeFileSync(`./${workspace}/${name}-filtered-${year}.txt`, hanja.join('\n'))
fs.writeFileSync(`./${workspace}/${name}-unfiltered-${year}.txt`, hanjaUnfiltered.join('\n'))

fs.writeFileSync(`./${workspace}/${name}-filtered-${year}.tsv`, filtered.join('\n'))
