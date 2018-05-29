jest.mock('aws-sdk', () => {
    return {
        config: {
            update: jest.fn()
        },
        DynamoDB: jest.fn()
    }
})

const aws = require('aws-sdk'),
    batchUpload = require('../../lib/batch-upload'),
    faker = require('faker')

describe('batch upload', () => {
    const dynamoDbMock = {
        batchWriteItem: jest.fn()
    }

    beforeEach(() => {
        dynamoDbMock.batchWriteItem.mockClear()
        aws.config.update.mockClear()
        aws.DynamoDB.mockClear().mockImplementation(() => dynamoDbMock)
    })

    it("is configured with the passed parameters", () => {
        let awsOptions = {region: faker.random.uuid()}
        batchUpload([],awsOptions,{})
        expect(aws.config.update.mock.calls[0][0]).toBe(awsOptions)
    })

    it("obtains dynamoDb instance with dynamo options passed", () => {
        let dynamoOptions = {version: faker.random.uuid()}
        batchUpload([],{},dynamoOptions)
        expect(aws.DynamoDB.mock.calls[0][0]).toBe(dynamoOptions)
    })

    it("sends the data passed to dynamoDB", () => {
        let formatedContent = [{content: faker.random.uuid()},{content: faker.random.uuid()}]
        batchUpload(formatedContent,null,null)
        expect(dynamoDbMock.batchWriteItem.mock.calls[0][0]).toEqual(formatedContent[0])
        expect(dynamoDbMock.batchWriteItem.mock.calls[1][0]).toEqual(formatedContent[1])
    })
})