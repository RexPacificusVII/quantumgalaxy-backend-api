const connectDatabase = require('../database/db');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();

    // Extract necessary information from the request
    const { user_id, product_id, quantity } = JSON.parse(event.body || '{}');

    // Input validation
    if (!user_id || !product_id || !quantity || quantity < 1) {
      throw new Error('Invalid input. Please provide user_id, product_id, and a valid quantity.');
    }

    // Find the user by user_id
    const user = await User.findById(user_id);

    if (!user) {
      throw new Error('User not found.');
    }

    // Check if the product exists
    const product = await Product.findById(product_id);

    if (!product) {
      throw new Error('Product not found.');
    }

    // Check if the product is already in the user's cart
    const existingCartItem = user.cart.find(item => item.product.equals(product_id));

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      user.cart.push({
        product: product_id,
        quantity: quantity,
      });
    }

    // Save the updated user document
    await user.save();

    // Return a success response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Product added to cart successfully.',
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
