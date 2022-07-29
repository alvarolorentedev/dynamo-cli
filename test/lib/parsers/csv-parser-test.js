jest.mock('fs', () => {
    return {
        createReadStream: jest.fn()
    }
})

const fs = require('fs'),
    parser = require('../../../lib/parsers/csv-parser'),
    { faker } = require('@faker-js/faker'),
    readableStream = require('stream').Readable,
    writableStream = require('stream').Writable

let streamFromArray = (array) => {
    let stream = new readableStream
    array.forEach(element => stream.push(element))
    stream.push(null)
    return stream
}

describe('csv parse', () => {

    beforeEach(() => {
        fs.createReadStream.mockClear()
        let stream = streamFromArray(["1234,2345\n","4444,5555\n", null])
        fs.createReadStream.mockImplementation(() => stream)
    })

    it('returns promise', async () => {
        expect(await parser('')).toBeInstanceOf(Array)
    })

    it('parses pased file', async () => {
        let path = `/path/to/file/${faker.datatype.uuid()}.txt`
        await parser(path)
        expect(fs.createReadStream.mock.calls[0][0]).toBe(path)
    })

    it('parses parses data based on passed delimiter', async () => {
        let result = parser('', ',')
        return expect(await result).toEqual([["1234","2345"],["4444","5555"]])
    })
})