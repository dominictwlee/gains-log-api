import { APIGatewayProxyEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as dynamoDbLib from './libs/dyamoDbLib';
import uuid from 'uuid';
import { success, failure } from './libs/responseLib';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'exerciseRoutines',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      routineId: uuid.v4(),
      content: data.content,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
