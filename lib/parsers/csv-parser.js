var fs = require('fs')
var { parse } = require('csv-parse')

async function readFile(filePath, delimiter) {
    return new Promise((resolve, reject) =>{
        let csvData=[]
        let a = fs.createReadStream(filePath)
        a.pipe(parse({delimiter: delimiter}))
        .on('data', (csvrow) => {
            csvData.push(csvrow)
        })
        .on('end',() => {
          resolve(csvData)
        })
    })
}

module.exports = readFile