
jest.mock('commander', () => {
    const jestFn = {
            default: this,
            version: jest.fn(() => jestFn),
            command: jest.fn(() => jestFn),
            description: jest.fn(() => jestFn),
            action: jest.fn(() => jestFn),
            parse: jest.fn(() => jestFn)
        }
    return jestFn
})

const commander = require('commander'),
dynamocli = require("../../bin/dynamo-cli")

describe('command has correct setup', () => {
    it("is version 0.0.1", () => {
        expect(commander.version.mock.calls[0][0]).toBe("0.0.1")
    })
    it("is has upload command with correct description", () => {
        expect(commander.command.mock.calls[0][0]).toBe("upload <pathcsv>")
        expect(commander.description.mock.calls[0][0]).toBe("upload csv to dynamodb")
        expect(commander.action.mock.calls[0][0]).toBeInstanceOf(Function)
    })
    it("parses args", () => {
        expect(commander.parse.mock.calls.length).toBe(1)
        expect(commander.parse.mock.calls[0][0]).toBe(process.argv)
    })

});
