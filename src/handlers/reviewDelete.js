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

    // Input validation
    if (!review_id) {
      throw new Error('Review ID is required for deleting a review.');
    }

    // Check if the review with the given ID exists
    const review = await Review.findById(review_id);

    if (!review) {
      throw new Error('Review not found.');
    }

     // Remove the review
    await review.deleteOne();

    // Update the associated product's rating
    try {
      const product = await Product.findById(review.product_id);
      if (product) {
        // Update rating fields
        product.rating.rate = parseFloat(
          ((product.rating.rate * product.rating.count - review.rating) / (product.rating.count - 1)).toFixed(2)
        );
        product.rating.count -= 1;

        // Save the updated product
        await product.save();
      }
    } catch (error) {
      console.error(`Error updating product rating: ${error.message}`);
    }

    // Return a success message
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Review deleted successfully',
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
