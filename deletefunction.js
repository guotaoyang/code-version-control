'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	// Bring in the documentClient library
	const documentClient = new AWS.DynamoDB.DocumentClient(); // instanialize 
	
	let responseBody = "";
	let statusCode = 0;
	
	// extract variables that we need to use in db
	const { id } = event.pathParameters;
	
	const params = {
		TableName: "age_distribution",
		// contain the details what records will be added into table
		Key: {
			country: country
		}
	};
	
	try {
		const data = await documentClient.delete(params).promise(); // add data into the db
		responseBody = JSON.stringify(data); // hold the response in a string type
		statusCode = 204;
	} catch (err) {
		responseBody = `Unable to delete record: ${err}`;
		statusCode = 403;
	}
	
	const response = {
		statusCode: statusCode,
		headers: {
			"Content-Type" : " application/json"
		},
		body: responseBody //send back the responseBody
	};
	
	// return the response
	return response;
};