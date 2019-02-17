import { APIGatewayProxyEvent } from 'aws-lambda';
import { failure, success } from '../helpers/responseLib';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
  const params = {
    TableName: 'exerciseRoutines',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      routineId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    if (!result.Item) {
      return failure({ status: false, error: 'Item not found.' });
    }
    return success(result.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
