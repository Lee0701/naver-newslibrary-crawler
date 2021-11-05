
const fs = require('fs')
const path = require('path')

const year = 1960
const translatedContent = true

const indir = `./out/jungang_${year}`
const outFile = 'extracted' + (translatedContent ? '-translated.txt' : '.txt')

const getContent = (article) => article.article.content
const getTranslatedContent = (article) => article.article.translatedContent
        .replace(/([^<>]+)<span class='translation'>\(([^<>]+)\)<\/span>/g, (match, a, b) => a.substring(0, a.length - b.length) + b)

const result = fs.readdirSync(indir).filter((name) => {
    return name.startsWith('article_') && name.endsWith('.json')
}).flatMap((name) => {
    const infile = path.join(indir, name)
    const data = JSON.parse(fs.readFileSync(infile).toString())
    return Object.values(data).map((article) => translatedContent ? getTranslatedContent(article) : getContent(article))
})

fs.writeFileSync(outFile, result.join('\n\n'))
