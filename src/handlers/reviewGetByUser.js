const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Review = require('../models/Review');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const user_id = event.pathParameters.user_id;

    // Input validation
    if (!user_id) {
      throw new Error('User ID is required to list reviews for a specific user.');
    }

    // Retrieve reviews for the specified user
    const userReviews = await Review.find({ user_id });

    // Return the list of reviews for the specified user
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        reviews: userReviews,
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
