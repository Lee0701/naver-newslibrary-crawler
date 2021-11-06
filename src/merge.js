
const fs = require('fs')

const years = process.argv.slice(2).map((n) => parseInt(n))
const files = years.map((year) => `filtered-${year}.txt`)

const merge = (files) => {
    const contents = files.map((file) => fs.readFileSync(file).toString().split('\n'))
    const maxLength = contents.map((lines) => lines.length).reduce((a, c) => a + c)
    const result = new Array(maxLength).fill().flatMap((_, i) => contents.filter((lines) => lines[i]).map((lines) => lines[i]))
    fs.writeFileSync('merged.txt', result.join('\n'))
}

merge(files)