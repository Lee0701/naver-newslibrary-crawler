
const fs = require('fs')

const year = parseInt(process.argv[2])

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

preprocess(`extracted-${year}.txt`, `preprocessed-${year}.txt`)
preprocess(`extracted-translated-${year}.txt`, `preprocessed-translated-${year}.txt`)
