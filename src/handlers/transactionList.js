const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Transaction = require('../models/Transaction');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    // Fetch all transactions from the database
    const transactions = await Transaction.find();

    // Return the list of transactions
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        transactions,
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

    const response = {
      statusCode: error.statusCode || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
