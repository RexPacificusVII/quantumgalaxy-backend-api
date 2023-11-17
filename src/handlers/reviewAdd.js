const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const requestBody = JSON.parse(event.body || '{}');
    const { product_id, user_id, rating, comment } = requestBody;

    // Input validation
    if (!product_id || !user_id || !rating) {
      throw new Error('Product ID, user ID, and rating are required for creating a review.');
    }

    // Check if the user with the given ID exists
    // Check if the user with the given ID exists
    const productExists = await Product.findById(product_id);
    const userExists = await User.findById(user_id);

    if (!productExists || !userExists) {
      throw new Error('Product or user not found');
    }

    const reviewObj = await Review.create({
      product_id,
      user_id,
      rating,
      comment,
    });

    // Return the created review details
    const response = {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Review created successfully',
        review: reviewObj,
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
