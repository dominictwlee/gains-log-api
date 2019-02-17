import { APIGatewayProxyEvent } from 'aws-lambda';
import { success, failure } from '../helpers/responseLib';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

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
    const result = await dynamoDb.update(params).promise();
    console.log(result);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
