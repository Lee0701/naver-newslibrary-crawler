
const fs = require('fs')
const path = require('path')

const workspace = 'workspace'
const name = process.argv[2]
const year = parseInt(process.argv[3])

const extract = (indir, outFile, translatedContent) => {
    const getContent = (article) => article.article.content.normalize('NFC')
    const getTranslatedContent = (article) => article.article.translatedContent
            .replace(/([^<>]+)<span class='translation'>\(([^<>]+)\)<\/span>/g, (match, a, b) => a.substring(0, a.length - b.length) + b)
            .normalize('NFC')

    const result = fs.readdirSync(indir).filter((name) => {
        return name.startsWith('article_') && name.endsWith('.json')
    }).flatMap((name) => {
        const infile = path.join(indir, name)
        const data = JSON.parse(fs.readFileSync(infile).toString())
        return Object.values(data).map((article) => translatedContent ? getTranslatedContent(article) : getContent(article))
    })

    fs.writeFileSync(outFile, result.join('\n\n'))

}

extract(`./out/${name}_${year}`, `./${workspace}/${name}-extracted-${year}.txt`, false)
extract(`./out/${name}_${year}`, `./${workspace}/${name}-extracted-translated-${year}.txt`, true)
