import { APIGatewayProxyEvent } from 'aws-lambda';
import uuid from 'uuid';
import * as dynamoDbLib from './libs/dyamoDbLib';
import { failure, success } from './libs/responseLib';

export async function main(event: APIGatewayProxyEvent) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'exerciseRoutines',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      routineId: uuid.v4(),
      exercises: data,
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
