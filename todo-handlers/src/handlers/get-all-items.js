
exports.getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // // All log statements are written to CloudWatch
    // // console.info('received:', event);

    // // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
    // // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
    // // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
    // var params = {
    //     TableName : tableName
    // };
    // console.log("🚀 ~ file: get-all-items.js ~ line 26 ~ exports.getAllItemsHandler= ~ params", params)

    // var params = {
    //     TableName: "Music"
    //    };
    
    //    dynamodb.listTables({Limit: 10}, function(err, data) {
    //     if (err) {
    //       console.log("Error", err.code);
    //     } else {
    //       console.log("Table names are ", data.TableNames);
    //     }
    //   });
    
    // const data = await docClient.scan(params).promise();
    // const items = data.Items;

    const items = [
        {id: 1, name: 'item 1', order: 1},
        {id: 2, name: 'item 2', order: 2},
        {id: 3, name: 'item 3', order: 3},
    ]

    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };
    return response
}
