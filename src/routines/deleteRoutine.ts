import { success, failure } from '../helpers/responseLib';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

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
    const result = await dynamoDb.delete(params).promise();
    return success({ status: true, response: result });
  } catch (e) {
    return failure({ status: false });
  }
}
