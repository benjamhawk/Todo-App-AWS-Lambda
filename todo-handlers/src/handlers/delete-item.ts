import { APIGatewayEvent } from "aws-lambda";

import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client =
  process.env.ENVIRONMENT === "dev"
    ? new DynamoDBClient({
        endpoint: "http://docker.for.mac.localhost:8000",
        region: "local",
      })
    : new DynamoDBClient({});

// /**
//  * A simple example includes a HTTP post method to add one item to a DynamoDB table.
//  */
export const deleteItemHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `deleteMethod only accepts POST method, you tried: ${event.httpMethod} method.`
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

  return response;
};
