const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Blog = require('../models/Blog');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    // Retrieve all blogs
    const allBlogs = await Blog.find();

    // Return the list of blogs
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        blogs: allBlogs,
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

    const response = {
      statusCode: error.statusCode || 500, // Internal Server Error status code
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
