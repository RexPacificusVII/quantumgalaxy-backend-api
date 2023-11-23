const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Transaction = require('../models/Transaction');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const requestBody = JSON.parse(event.body || '{}');
    const { type, user_id, products, total_amount } = requestBody;

    // Input validation
    if (!type || !user_id || !products || !total_amount) {
      throw new Error('User ID, products, total amount, and type are required for creating a transaction.');
    }

    const transactionObj = await Transaction.create({
      type,
      user_id,
      products,
      total_amount,
    });

    // Return the created transaction details
    const response = {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Transaction created successfully',
        transaction: transactionObj,
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

    const response = {
      statusCode: error.statusCode || 400, // Bad Request status code
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
