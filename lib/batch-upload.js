const aws = require('aws-sdk')

async function upload(formatedContent, awsOptions, dynamoOptions) {
    aws.config.update(awsOptions)
    let dynamo = new aws.DynamoDB(dynamoOptions)
    formatedContent.forEach(subContent => dynamo.batchWriteItem(subContent))
}

module.exports = upload