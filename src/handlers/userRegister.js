const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const requestBody = JSON.parse(event.body || '{}');
    const { first_name, last_name, email, password } = requestBody;

    // Input validation
    if (!first_name || !last_name || !email || !password) {
      throw new Error('First name, last name, email, and password are required.');
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email is already registered.');
    }

    const userObj = await User.create({
      first_name,
      last_name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    // Only return essential information in the response
    const response = {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'User registered successfully',
        userId: userObj._id,
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

    const response = {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
