
const p = require('phin')
const fs = require('fs')
const path = require('path')

const year = 1960

const outDir = `./out/jungang_${year}`
const filename = 'articlelist'
const infile = `printlist_00020_${year}-01-01_${year}-12-31.json`

const baseUrl = 'https://newslibrary.naver.com/api/article/list/json'


const dateFormat = (millis) => {
    const date = new Date(millis)
    const pad = (num) => num.toString().padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

;

(async () => {

    const data = JSON.parse(fs.readFileSync(path.join(outDir, infile)).toString())
    const officeId = data.officeId

    Promise.all(Object.entries(data.prints).map(async ([date, prints]) => {
        const outFile = path.join(outDir, `${filename}_${officeId}_${date}.json`)
        const {printNo, pageCount, publishType} = prints.print[0]
        const res = await p({
            url: baseUrl,
            method: 'POST',
            form: {
                date: date,
                publishType: publishType,
                officeId: officeId,
                printNo: printNo,
                detailYn: 'false',
                detailCode: '1001100001000000110111100000001010000000001',
                startPageNo: '1',
                pageCount: pageCount,
                urlKey: 'articleInfo',
                viewID: 'app_articleInfo',
                requestId: '3',
                target: 'viewer'
            },
            parse: 'json'
        })
        fs.writeFileSync(outFile, JSON.stringify(res.body.result))
    }))
})()
