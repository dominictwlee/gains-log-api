import { APIGatewayProxyEvent } from 'aws-lambda';
import uuid from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { failure, success } from '../helpers/responseLib';
import jsonSafeParse from '../helpers/jsonSafeParse';

const dynamoDb = new DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
  if (!event.body) {
    console.log('Request body is missing');
    return failure({ message: 'Request body is missing' });
  }

  const [parseError, body] = jsonSafeParse(event.body);

  if (parseError) {
    return failure(parseError);
  }

  const params = {
    TableName: 'exerciseRoutines',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      routineId: uuid.v4(),
      exercises: body,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
