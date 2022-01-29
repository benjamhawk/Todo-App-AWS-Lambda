const {
  DynamoDBClient,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");

const client =
  process.env.ENV === "dev"
    ? new DynamoDBClient({
        endpoint: "http://docker.for.mac.localhost:8000",
        region: "local",
      })
    : new DynamoDBClient();

// /**
//  * A simple example includes a HTTP post method to add one item to a DynamoDB table.
//  */
exports.deleteItemHandler = async (event) => {
  if (event.httpMethod !== "DELETE") {
    throw new Error(
      `deleteMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`
    );
  }

  // // Get id and name from the body of the request
  const { id } = JSON.parse(event.body);

  const command = new DeleteItemCommand({
    Key: {
      id: { S: id },
    },
    TableName: process.env.SAMPLE_TABLE,
  });
  const results = await client.send(command);

  const response = {
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    statusCode: 200,
    body: "Item removed from the table.",
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
