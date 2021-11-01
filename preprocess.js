
const fs = require('fs')
const path = require('path')

const filename = 'merged.txt'

const replaceEntities = (str) => {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
}

const lines = fs.readFileSync(filename).toString().split('\n')
const processedLines = lines
        .flatMap((line) => line.split('<br>'))
        .map((line) => replaceEntities(line))
        .map((line) => line.trim())
        .filter((line) => line)

fs.writeFileSync('preprocessed.txt', processedLines.join('\n'))
