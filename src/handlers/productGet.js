const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Product = require('../models/Product');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const productId = event.pathParameters.id;

    // Input validation: Check if the productId is provided
    if (!productId) {
      throw new Error('Product ID is required.');
    }

    // Fetch the product by ID from the database
    const product = await Product.findById(productId);

    // Check if the product with the given ID exists
    if (!product) {
      throw new Error('Product not found.');
    }

    // Return the product details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        product,
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
