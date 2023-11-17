const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Import bcrypt

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const userId = event.pathParameters.id;
    const requestBody = JSON.parse(event.body || '{}');
    const { first_name, last_name, email, password, image, role } = requestBody;

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

    // Update user details
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;

    // Update password only if it has changed and is provided
    if (password !== undefined && password !== user.password) {
      // Hash the password before saving
      user.password = bcrypt.hashSync(password, 10);
    }

    if (image) user.image = image;
    if (role) user.role = role;

    // Log user object before saving
    console.log('User object before saving:', user);

    // Save the updated user details
    await user.save();

    // Return the updated user details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'User details updated successfully',
        user,
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
