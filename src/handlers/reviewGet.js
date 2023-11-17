const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Review = require('../models/Review');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const reviewId = event.pathParameters.id;

    // Input validation: Check if the reviewId is provided
    if (!reviewId) {
      throw new Error('Review ID is required.');
    }

    // Fetch the review by ID from the database
    const review = await Review.findById(reviewId);

    // Check if the review with the given ID exists
    if (!review) {
      throw new Error('Review not found.');
    }

    // Return the review details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        review,
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
