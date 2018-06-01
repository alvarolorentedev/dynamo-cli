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



    
    // let size = result.length
    // for(i = 0; i < size; i = i + 25) {
    //   let subarray = result.slice(i, i + 25)
    //   console.log(subarray + "\n")
    //   let params = generateDataInFormat(subarray)
    //   ddb.batchWriteItem(params, function(err, data) {
    //       if (err) {
    //           console.log("Error", err)
    //       } else {
    //           console.log("Success", data)
    //       }
    //   })
    // }