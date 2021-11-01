
const fs = require('fs')
const path = require('path')

const indir = './out/jungang_1969/article'

const result = fs.readdirSync(indir).filter((name) => {
    return name.startsWith('article_') && name.endsWith('.json')
}).flatMap((name) => {
    const infile = path.join(indir, name)
    const data = JSON.parse(fs.readFileSync(infile).toString())
    return Object.values(data).map((article) => article.article.content)
})

fs.writeFileSync('merged.txt', result.join('\n\n'))
