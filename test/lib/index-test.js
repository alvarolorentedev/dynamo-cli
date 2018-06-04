jest.mock('../../lib/helpers/data-formater', () => jest.fn())
jest.mock('../../lib/helpers/requests-generator', () => jest.fn())
jest.mock('../../lib/parsers/csv-parser', () => jest.fn())
jest.mock('../../lib/batch-upload', () => jest.fn())

const index = require("../../lib/index")
    dataFormater = require("../../lib/helpers/data-formater"),
    requestGenerator = require("../../lib/helpers/requests-generator"),
    csvParse = require("../../lib/parsers/csv-parser"),
    upload = require("../../lib/batch-upload"),
    faker = require('faker')
    
describe('index', () => {

    beforeEach(() => {
        csvParse.mockClear()
        dataFormater.mockClear()
        requestGenerator.mockClear()
        upload.mockClear()
    })
    it("calls the parser with correct parameters", () => {
        let path = `path/to/file/${faker.random.uuid()}`
        let delimeter = faker.random.word()
        index.upload(path, delimeter)
        expect(csvParse.mock.calls[0]).toEqual([path,delimeter])
    })

    it("calls the data formater with correct parameters", () => {
        parserResponse = [faker.random.uuid(), faker.random.uuid()]
        csvParse.mockImplementation(() => parserResponse)
        index.upload("path/to/file", ",")
        expect(dataFormater.mock.calls[0][0]).toEqual(parserResponse)
    })

    it("calls the request generator with correct parameters", () => {
        formatResponse = [[faker.random.uuid(), faker.random.uuid()],[faker.random.uuid(), faker.random.uuid()]]
        dataFormater.mockImplementation(() => formatResponse)
        index.upload("path/to/file", ",")
        expect(requestGenerator.mock.calls[0][0]).toEqual(formatResponse)
    })

    it("calls the batch upload with correct parameters", () => {
        requestsData = [[faker.random.uuid(), faker.random.uuid()]]
        requestGenerator.mockImplementation(() => requestsData)
        index.upload("path/to/file", ",")
        expect(upload.mock.calls[0][0]).toEqual(requestsData)
    })
})