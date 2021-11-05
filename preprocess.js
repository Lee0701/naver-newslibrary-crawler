
const fs = require('fs')

const preprocess = (inFile, outFile) => {
    const replaceEntities = (str) => {
            return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    }

    const lines = fs.readFileSync(inFile).toString().split('\n')
    const processedLines = lines
            .flatMap((line) => line.split('<br>'))
            .map((line) => replaceEntities(line))
            .map((line) => line.trim())
            .filter((line) => line)

    fs.writeFileSync(outFile, processedLines.join('\n'))
}

const year = 1960

preprocess('extracted.txt', 'preprocessed.txt')
preprocess(`extracted-translated-${year}.txt`, `preprocessed-translated-${year}.txt`)
