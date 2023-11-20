const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const requestBody = JSON.parse(event.body || '{}');
    const { email, password } = requestBody;

    // Input validation
    if (!email) {
      throw new Error('Please enter your email.');
    }

    if (!password) {
      throw new Error('Please enter your password.');
    }

    // Check if the user with the given email exists
    const user = await User.findOne({ email }).select('+password');

    // Check if the user exists and the password is correct
    if (!user) {
      throw new Error('User not found.');
    }

    console.log('Input Password:', password);
    console.log('Stored Password:', user.password);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid email or password.');
    }

    // Set up session
    const sessionData = {
      userId: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      image: user.image,
      role: user.role,
      cart: user.cart,
    };

    // Set session expiration to 1 hour (adjust as needed)
    const sessionExpiration = new Date(Date.now() + 3600000); // 1 hour in milliseconds

    // Store session data
    const session = JSON.stringify({
      data: sessionData,
      expires: sessionExpiration.toISOString(),
    });

    // Return a success message or additional user details if needed
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Set-Cookie': `sessionId=${Buffer.from(session).toString('base64')}; HttpOnly; Secure; SameSite=None; Expires=${sessionExpiration.toUTCString()}`,
        // 'Set-Cookie': `sessionId=${Buffer.from(session).toString('base64')}; HttpOnly; SameSite=None; Expires=${sessionExpiration.toUTCString()}`,

      },
      body: JSON.stringify({
        message: 'Login successful',
        userId: user._id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        image: user.image,
        role: user.role,
        cart: user.cart,
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

    const response = {
      statusCode: error.statusCode || 401, // Unauthorized status code
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
