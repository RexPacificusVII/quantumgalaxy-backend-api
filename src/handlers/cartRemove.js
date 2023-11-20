const connectDatabase = require('../database/db');
const User = require('../models/User');
const Product = require('../models/Product'); // Import the Product model

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();

    // Extract necessary information from the request
    const { user_id, product_id } = JSON.parse(event.body || '{}');

    // Input validation
    if (!user_id || !product_id) {
      throw new Error('Invalid input. Please provide user_id and product_id.');
    }

    // Find the user by user_id
    const user = await User.findById(user_id);

    if (!user) {
      throw new Error('User not found.');
    }

    // Check if the product is in the user's cart
    const existingCartItemIndex = user.cart.findIndex(item => item.product.equals(product_id));

    if (existingCartItemIndex === -1) {
      throw new Error('Product not found in the cart.');
    }

    // Remove the product from the cart
    user.cart.splice(existingCartItemIndex, 1);

    // Save the updated user document
    await user.save();

    // Return a success response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Product removed from cart successfully.',
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

    // Return an error response
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
