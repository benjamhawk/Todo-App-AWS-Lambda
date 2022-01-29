const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

console.log(process.env.TEST_ENV);
const client =
  process.env.TEST_ENV === "dev"
    ? new DynamoDBClient({
        endpoint: "http://docker.for.mac.localhost:8000",
        region: "local",
      })
    : new DynamoDBClient();

exports.getAllItemsHandler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      throw new Error(
        `getAllItems only accept GET method, you tried: ${event.httpMethod}`
      );
    }

    const TableName = process.env.SAMPLE_TABLE;
    console.log(
      "🚀 ~ file: get-all-items.js ~ line 18 ~ exports.getAllItemsHandler= ~ TableName",
      TableName,
      process.env.TEST_ENV
    );
    const command = new ScanCommand({
      TableName,
    });

    const results = await client.send(command);
    const parsedResults = results.Items.map((item) => {
      return {
        id: item.id.S,
        name: item.name.S,
        order: item.order.S,
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
