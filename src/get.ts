import { APIGatewayProxyEvent } from 'aws-lambda';
import * as dynamoDbLib from './libs/dyamoDbLib';
import { failure, success } from './libs/responseLib';
import { ExerciseRoutineItem } from './types/ExerciseRoutineItem';

export async function main(event: APIGatewayProxyEvent) {
  const params = {
    TableName: 'exerciseRoutines',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      routineId: event.pathParameters.id,
    },
  };

  try {
    const result: { Item?: ExerciseRoutineItem } = await dynamoDbLib.call('get', params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: 'Item not found.' });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
