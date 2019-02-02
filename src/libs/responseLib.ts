export function success(body: any) {
  return createResponse(200, body);
}

export function failure(body: any) {
  return createResponse(500, body);
}

function createResponse(statusCode: number, body: any) {
  return {
    statusCode,
    header: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}
