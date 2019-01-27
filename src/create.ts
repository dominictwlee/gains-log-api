import { APIGatewayProxyEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import uuid from 'uuid';

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

  dynamoDb.put(params, (error, resData) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    };

    if (error) {
      const errorResponse = {
        statusCode: 500,
        headers,
        body: JSON.stringify({ status: false }),
      };

      return errorResponse;
    }

    console.log(resData);

    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(params.Item),
    };

    return response;
  });
}
