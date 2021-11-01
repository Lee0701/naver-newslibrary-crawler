
const p = require('phin')
const fs = require('fs')
const path = require('path')

const outDir = './out'
const filename = 'printlist'

const baseUrl = 'https://newslibrary.naver.com/api/page/list/json'

const startDate = '1969-02-01'
const endDate = '1969-12-31'
const officeId = '00023'

const getPrints = (body) => body.result.datePages.datePage[0].officePages.officePage[0].regularPrint.prints
const dateFormat = (millis) => {
    const date = new Date(millis)
    const pad = (num) => num.toString().padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

;

(async () => {
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
