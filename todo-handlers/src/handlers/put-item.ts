import { APIGatewayEvent } from "aws-lambda";
import { v4 as uuid } from "uuid";

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

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
export const putItemHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }

  // // Get id and name from the body of the request
  const { name, order } = JSON.parse(event.body);
  const id = uuid();

  // const result = await docClient.put(params).promise();
  const command = new PutItemCommand({
    Item: {
      id: { S: id },
      name: { S: name },
      order: { S: order },
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
    body: "Item added to the table.",
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
