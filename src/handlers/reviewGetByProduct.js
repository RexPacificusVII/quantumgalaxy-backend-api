const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Review = require('../models/Review');
const Product = require('../models/Product')

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const product_id = event.pathParameters.product_id;

    // Input validation
    if (!product_id) {
      throw new Error('Product ID is required to list reviews for a specific product.');
    }

    // Retrieve reviews for the specified product
    const productReviews = await Review.find({ product_id });

    // Return the list of reviews for the specified product
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        reviews: productReviews,
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
