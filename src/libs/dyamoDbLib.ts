import * as AWS from 'aws-sdk';

interface IDynamoDBParams {
  TableName: string;
  Item: object;
}

export function call(action: string, params: IDynamoDBParams): Promise<object> {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
