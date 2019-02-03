import * as AWS from 'aws-sdk';

interface IDynamoDBParams {
  TableName: string;
  Item?: object;
  Key?: {
    userId: string;
    routineId: string;
  };
  UpdateExpression?: string;
  KeyConditionExpression?: string;
  ReturnValues?: string;
}

export function call(action: string, params: IDynamoDBParams): Promise<object> {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
