const formater = require('../../../lib/helpers/data-formater'),
    faker = require('faker')

describe('data formater', () => {
    beforeEach(() => {
    })

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

// function generateDataInFormat(dataArray) {
//     let arrayfromCSV = dataArray.map(dataPoint => {
//         return {
//             PutRequest: {
//                 Item: {
//                     ListingId: { S: dataPoint[0] } ,
//                     AdId: { S: dataPoint[1] }
//                 }
//             }
//         }
//     })

//         return  {
//                 RequestItems: {
//                     "ExportsMarketplaceMobileDeAds": arrayfromCSV
//                 }
//             }

// }

    
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