
const fs = require('fs')
const path = require('path')

const indir = './out/jungang_1962'

const translatedContent = true

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

fs.writeFileSync('merged-translated.txt', result.join('\n\n'))
