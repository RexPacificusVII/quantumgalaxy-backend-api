const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const User = require('../models/User');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const userId = event.pathParameters.id;

    // Input validation: Check if the userId is provided
    if (!userId) {
      throw new Error('User ID is required.');
    }

    // Fetch the user by ID from the database
    const user = await User.findById(userId);

    // Check if the user with the given ID exists
    if (!user) {
      throw new Error('User not found.');
    }

    // Delete the user
    await user.deleteOne();

    // Return a success message
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'User deleted successfully',
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
