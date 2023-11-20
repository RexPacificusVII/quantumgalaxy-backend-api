const connectDatabase = require('../database/db');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();

    // Extract necessary information from the request
    const { user_id } = event.pathParameters;

    // Input validation
    if (!user_id) {
      throw new Error('Invalid input. Please provide user_id.');
    }

    // Find the user by user_id
    const user = await User.findById(user_id).populate('cart.product');

    if (!user) {
      throw new Error('User not found.');
    }

    // Extract cart details
    const cartDetails = user.cart.map(cartItem => ({
      product: {
        id: cartItem.product._id,
        name: cartItem.product.name,
        price: cartItem.product.price,
      },
      quantity: cartItem.quantity,
    }));

    // Return the cart details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        cart: cartDetails,
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
