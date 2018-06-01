const formater = require('../../../lib/helpers/data-formater'),
    faker = require('faker')


    
describe('data formater', () => {

    it("should return an array with batches of information in correct format", () => {
        let dataWithHeaders=[[faker.lorem.words(2), faker.lorem.words(2)], [faker.lorem.word(), faker.lorem.word()], [faker.lorem.word(), faker.lorem.word()]]
        
        let expectedFormat = [
            {
                PutRequest: {
                    Item: {
                        [dataWithHeaders[0][0]] : dataWithHeaders[1][0],
                        [dataWithHeaders[0][1]] : dataWithHeaders[1][1],
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        [dataWithHeaders[0][0]] : dataWithHeaders[2][0],
                        [dataWithHeaders[0][1]] : dataWithHeaders[2][1],
                    }
                }
            }            
        ]
        expect(formater(dataWithHeaders)).toEqual(expectedFormat)
    })
})