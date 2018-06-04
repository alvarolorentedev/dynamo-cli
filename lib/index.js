const dataFormater = require("./helpers/data-formater"),
    requestGenerator = require("./helpers/requests-generator"),
    csvParse = require("./parsers/csv-parser"),
    batchUpload = require("./batch-upload")

const upload = (path, delimeter) => {
    let fileData = csvParse(path, delimeter)
    let formatedData = dataFormater(fileData)
    let requests = requestGenerator(formatedData)
    batchUpload(requests)
 };

module.exports = { upload }