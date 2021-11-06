
const fs = require('fs')
const path = require('path')

const year = parseInt(process.argv[2])

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

extract(`./out/jungang_${year}`, `extracted-${year}.txt`, false)
extract(`./out/jungang_${year}`, `extracted-translated-${year}.txt`, true)
