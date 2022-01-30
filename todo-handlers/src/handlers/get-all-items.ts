import { APIGatewayEvent } from "aws-lambda";

import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client =
  process.env.ENVIRONMENT === "dev"
    ? new DynamoDBClient({
        endpoint: "http://docker.for.mac.localhost:8000",
        region: "local",
      })
    : new DynamoDBClient({});

export const getAllItemsHandler = async (event: APIGatewayEvent) => {
  try {
    if (event.httpMethod !== "GET") {
      throw new Error(
        `getAllItems only accept GET method, you tried: ${event.httpMethod}`
      );
    }

    const TableName = process.env.SAMPLE_TABLE;

    const command = new ScanCommand({
      TableName,
    });

    const results = await client.send(command);
    const parsedResults = results.Items.map((item) => {
      return {
        id: item.id.S,
        name: item.name.S,
        order: item.order.S,
        test: "hello4",
      };
    });

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      body: JSON.stringify(parsedResults),
    };
    return response;
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 500,
      body: err.message,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
  }
};
