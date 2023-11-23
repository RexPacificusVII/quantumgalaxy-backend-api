const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Transaction = require('../models/Transaction');
const Product = require('../models/Product'); // Assuming Product model import

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const requestBody = JSON.parse(event.body || '{}');
    const { type, user_id, products, total_amount } = requestBody;

    // Input validation
    if (!type || !products || !total_amount) {
      throw new Error('Products, total amount, and type are required for creating a transaction.');
    }

    let userIdToUse = null; // Initialize user ID variable

    // Check if user_id exists in the request body
    if (user_id) {
      userIdToUse = user_id; // Use provided user ID if available
    }

    // Validate product IDs before creating the transaction
    const productIDs = products.map(product => product.product_id);

    // Check if all product IDs exist in the Product collection
    const existingProducts = await Product.find({ _id: { $in: productIDs } });

    if (existingProducts.length !== productIDs.length) {
      throw new Error('Invalid product ID(s) provided.');
    }

    // Create the transaction after product ID validation
    const transactionObj = await Transaction.create({
      type,
      user_id: userIdToUse, // Use user ID or null for guest checkout
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
