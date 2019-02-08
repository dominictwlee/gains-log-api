import * as dynamoDbLib from './libs/dyamoDbLib';
import { success, failure } from './libs/responseLib';
import { APIGatewayProxyEvent } from 'aws-lambda';

export async function main(event: APIGatewayProxyEvent) {
  const params = {
    TableName: 'exerciseRoutines',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      routineId: event.pathParameters.id,
    },
    ReturnValues: 'ALL_OLD',
  };

  try {
    const result = await dynamoDbLib.call('delete', params);
    return success({ status: true, response: result });
  } catch (e) {
    return failure({ status: false });
  }
}
