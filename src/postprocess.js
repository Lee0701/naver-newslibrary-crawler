
const fs = require('fs')
const readline = require('readline')

const inFile = process.argv[2]
const outFile = process.argv[3]

const buildDict = (text) => Object.fromEntries(text.split('\n').filter((line) => line.trim()).map((line) => line.split('\t')))
const buildDictReversed = (text) => Object.fromEntries(text.split('\n').filter((line) => line.trim()).map((line) => line.split('\t')).map(([v, k]) => [k, v]))
const buildCandidateDict = (text) => text.split('\n').filter((line) => line.trim()).map((line) => line.split('\t')).reduce((acc, [k, v]) => (acc[k] = [...(acc[k] || []), v], acc), {})

const dic4 = buildDict(fs.readFileSync('dic4.txt').toString())
const ks1001 = fs.readFileSync('ks1001.txt').toString()
const jp = buildCandidateDict(fs.readFileSync('jp.txt').toString())
const cn = buildCandidateDict(fs.readFileSync('cn.txt').toString())
const extra = buildDict(fs.readFileSync('extra.txt').toString())

const revJp = buildDictReversed(fs.readFileSync('jp.txt').toString())
const revCn = buildDictReversed(fs.readFileSync('cn.txt').toString())

const jpDic4 = Object.fromEntries(Object.entries(dic4).map(([k, _v]) => [k.split('').map((c) => revJp[c] || c).join(''), k]))
const cnDic4 = Object.fromEntries(Object.entries(dic4).map(([k, _v]) => [k.split('').map((c) => revCn[c] || c).join(''), k]))

const rl = readline.createInterface(fs.createReadStream(inFile))
fs.writeFileSync(outFile, '')
const writer = fs.createWriteStream(outFile, {flags: 'a'})

const postprocess = (line) => {
    line = line.normalize('NFC')
    let result = ''
    for(let i = 0 ; i < line.length ; i++) {
        if(result.length <= i) {
            for(let j = i + 5 ; j >= i ; j--) {
                if(j > line.length) continue
                const substr = line.substring(i, j)
                if(dic4[substr]) {
                    result += substr
                    break
                } else if(jpDic4[substr]) {
                    result += jpDic4[substr]
                    break
                } else if(cnDic4[substr]) {
                    result += cnDic4[substr]
                    break
                } else if(substr.length == 1) {
                    if(jp[substr] && jp[substr].length == 1) result += jp[substr][0]
                    else if(cn[substr] && cn[substr].length == 1) result += cn[substr][0]
                    else if(extra[substr]) result += extra[substr]
                    else result += substr
                }
            }
        }
    }
    return result
}

rl.on('line', (line) => {
    const postprocessed = postprocess(line)

    writer.write(postprocessed + '\n')
    // if(line == postprocessed) return
    // console.log(line)
    // console.log(postprocessed)
    // console.log()
})