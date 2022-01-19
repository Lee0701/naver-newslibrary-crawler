
const fs = require('fs')

const workspace = 'workspace'
const name = process.argv[2]
const year = parseInt(process.argv[3])

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

preprocess(`./${workspace}/${name}-extracted-${year}.txt`, `./${workspace}/${name}-preprocessed-${year}.txt`)
preprocess(`./${workspace}/${name}-extracted-translated-${year}.txt`, `./${workspace}/${name}-preprocessed-translated-${year}.txt`)
