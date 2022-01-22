
const p = require('phin')
const fs = require('fs')
const path = require('path')

const name = process.argv[2]
const year = parseInt(process.argv[3])
const officeId = process.argv[4]

const outDir = `./out/${name}_${year}`
const filename = 'printlist'

const baseUrl = 'https://newslibrary.naver.com/api/page/list/json'

const startDate = `${year}-01-01`
const endDate = `${year}-12-31`

const getPrints = (body) => body.result.datePages.datePage[0].officePages.officePage[0].regularPrint.prints
const dateFormat = (millis) => {
    const date = new Date(millis)
    const pad = (num) => num.toString().padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

;

(async () => {
    fs.mkdirSync(outDir)
    const outFile = path.join(outDir, `${filename}_${officeId}_${startDate}_${endDate}.json`)

    const result = {
        officeId: officeId,
        prints: {},
    }

    const start = Date.parse(startDate)
    const end = Date.parse(endDate)

    for(let date = start ; date <= end ; date += 86400000) {
        const formatted = dateFormat(date)
        const res = await p({
            url: baseUrl,
            method: 'POST',
            form: {
                startDate: formatted,
                officeId: officeId,
                listLevel: '2',
                urlKey: 'newsData',
                viewID: 'app_newsInfo',
                requestId: '1',
            },
            parse: 'json'
        })
        result.prints[formatted] = getPrints(res.body)
    }
    fs.writeFileSync(outFile, JSON.stringify(result))
})()
