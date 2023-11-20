const connectDatabase = require('../database/db');
const User = require('../models/User');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();

    const { user_id, product_id, quantity } = JSON.parse(event.body || '{}');

    if (!user_id || !product_id || !quantity) {
      throw new Error('Invalid input. Please provide user_id, product_id, and quantity.');
    }

    const user = await User.findById(user_id);

    if (!user) {
      throw new Error('User not found.');
    }

    // Find the product in the cart
    const cartItem = user.cart.find(item => item.product.toString() === product_id);

    if (!cartItem) {
      throw new Error('Product not found in the cart.');
    }

    // Update the quantity
    cartItem.quantity = quantity;

    await user.save();

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Cart updated successfully.',
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

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
