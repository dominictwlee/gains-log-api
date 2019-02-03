import { APIGatewayProxyEvent } from 'aws-lambda';
import * as dynamoDbLib from './libs/dyamoDbLib';
import { success, failure } from './libs/responseLib';

export async function main(event: APIGatewayProxyEvent, context) {
  console.log(event, '[EVENT OBJECT]');
  console.log(context, '[CONTEXT OBJECT]');
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'exerciseRoutines',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      routineId: event.pathParameters.id,
    },
    UpdateExpression: 'SET exercises = :exercises',
    ExpressionAttributeValues: {
      ':exercises': data || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDbLib.call('update', params);
    console.log(result);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
