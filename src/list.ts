import * as dynamoDbLib from './libs/dyamoDbLib';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { success, failure } from './libs/responseLib';

export async function main(event: APIGatewayProxyEvent) {
  const params = {
    TableName: 'exerciseRoutines',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result: any = await dynamoDbLib.call('query', params);
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
