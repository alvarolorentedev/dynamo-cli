const requestGenerator = require('../../../lib/helpers/requests-generator'),
    faker = require('faker')

describe('request generator', () => {

    it("returns requests for the requested table", () => {
        let tableName = faker.random.uuid()
        let dataFormated = [{some: faker.random.uuid()}, {some: faker.random.uuid()}]
        let expectedResult = [
            {
                RequestItems: {
                    [tableName]: dataFormated
                }
            }
        ]
        expect(requestGenerator(tableName, dataFormated, 2)).toEqual(expectedResult)
    })

    it("if size is bigger than max batch size split into batches", () => {
        let tableName = faker.random.uuid()
        let dataFormated = [{some: faker.random.uuid()}, {some: faker.random.uuid()}, {some: faker.random.uuid()}, {some: faker.random.uuid()}]
        let expectedResult = [
            {
                RequestItems: {
                    [tableName]: [dataFormated[0],dataFormated[1]]
                }
            },
            {
                RequestItems: {
                    [tableName]: [dataFormated[2],dataFormated[3]]
                }
            }
        ]
        expect(requestGenerator(tableName, dataFormated, 2)).toEqual(expectedResult)
    })

})
