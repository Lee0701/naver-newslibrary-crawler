
const p = require('phin')
const fs = require('fs')
const path = require('path')

const outDir = './out'
const filename = 'published'

const baseUrl = 'https://newslibrary.naver.com/api/summary/publishedDate/json'

const startDate = '1969-01-01'
const endDate = '1969-03-31'

;

(async () => {
    const outFile = path.join(outDir, `${filename}_${startDate}_${endDate}.json`)

    const res = await p(`${baseUrl}?startDate=${startDate}&endDate=${endDate}`)

    fs.writeFileSync(outFile, res.body.toString())
})()
