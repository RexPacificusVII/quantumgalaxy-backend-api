const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Blog = require('../models/Blog');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const blog_id = event.pathParameters.id;

    // Input validation
    if (!blog_id) {
      throw new Error('Blog ID is required to get a blog.');
    }

    // Retrieve the blog by ID
    const blog = await Blog.findById(blog_id);

    // Check if the product with the given ID exists
    if (!blog) {
      throw new Error('Blog not found.');
    }

    // Return the blog details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        blog,
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
