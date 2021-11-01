
const p = require('phin')
const fs = require('fs')
const path = require('path')
const queue = require('block-queue')

const outDir = './out'
const filename = 'article'

const baseUrl = 'https://newslibrary.naver.com/api/article/detail/json'

const sleep = (t) => new Promise(resolve=>setTimeout(resolve,t))
;

(async () => {
    const fileList = fs.readdirSync(outDir).filter((filename) => filename.startsWith('articlelist_') && filename.endsWith('.json'))

    const q = queue(1, ([infile, i], done) => {
        const data = JSON.parse(fs.readFileSync(path.join(outDir, infile)).toString())
        const {date, officeId} = data
        console.log(date)

        Promise.all(data.articles.article.map(async (article) => {
            const res = await p({
                url: baseUrl,
                method: 'POST',
                form: {
                    articleId: article.articleId,
                    detailCode: '1001000001000000000001101100000000000000000',
                    urlKey: 'articleDetail',
                    viewID: 'app_articleDetail',
                    requestId: (i + 1).toString(),
                    target: 'viewer'
                },
                parse: 'json'
            })
            return [article.articleId, res.body.result]
        })).then((result) => {
            const outFile = path.join(outDir, `${filename}_${officeId}_${date}.json`)
            fs.writeFileSync(outFile, JSON.stringify(Object.fromEntries(result)))
            sleep(500).then(() => done())
        })
    })

    fileList.forEach(async (infile, i) => {
        q.push([infile, i])
    })

})()