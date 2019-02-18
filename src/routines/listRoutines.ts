import { APIGatewayProxyEvent } from 'aws-lambda';
import { success, failure } from '../helpers/responseLib';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
  const params = {
    TableName: 'exerciseRoutines',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamoDb.query(params).promise();
    if (!result.Items) {
      return success({ message: 'No Items' });
    }
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
