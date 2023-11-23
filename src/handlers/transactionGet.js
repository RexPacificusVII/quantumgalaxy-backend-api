const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Transaction = require('../models/Transaction');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const transactionId = event.pathParameters.id;

    // Input validation: Check if the transactionId is provided
    if (!transactionId) {
      throw new Error('Transaction ID is required.');
    }

    // Fetch the transaction by ID from the database
    const transaction = await Transaction.findById(transactionId);

    // Check if the transaction with the given ID exists
    if (!transaction) {
      throw new Error('Transaction not found.');
    }

    // Return the transaction details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        transaction,
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

    const response = {
      statusCode: error.statusCode || 404, // Not Found status code
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
