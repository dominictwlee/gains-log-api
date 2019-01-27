export function success(body: object) {
  return createResponse(200, body);
}

export function failure(body: object) {
  return createResponse(500, body);
}

function createResponse(statusCode: number, body: object) {
  return {
    statusCode,
    header: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}
