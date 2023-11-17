const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();
    const review_id = event.pathParameters.id;
    const requestBody = JSON.parse(event.body || '{}');
    const { product_id, user_id, rating, comment } = requestBody;

    // Input validation
    if (!review_id || (!rating && !comment)) {
      throw new Error('Review ID and at least one field (rating or comment) are required for editing a review.');
    }

    // Update review details
    let originalReview = await Review.findById(review_id);

    if (!originalReview) {
      throw new Error('Review not found.');
    }

    if (rating !== undefined) {
      // Check if the rating is modified
      if (originalReview.rating !== rating) {
        originalReview.rating = rating;
      }
    }
    if (comment !== undefined) originalReview.comment = comment;

    // Save the updated review
    await originalReview.save();

    // Save the updated review
    await originalReview.save();

    // Return the updated review details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Review updated successfully',
        originalReview,
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
